<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Contact Me</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-gray-700 dark:text-gray-300">Name</label>
        <input
          v-model="form.name"
          required
          :disabled="isSubmitting"
          class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white disabled:opacity-50"
          placeholder="Your Name"
          minlength="2"
        />
        <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          v-model="form.email"
          required
          :disabled="isSubmitting"
          class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white disabled:opacity-50"
          placeholder="Your Email"
        />
        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300">Subject</label>
        <input
          v-model="form.subject"
          required
          :disabled="isSubmitting"
          class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white disabled:opacity-50"
          placeholder="Subject/Topic"
          minlength="5"
        />
        <span v-if="errors.subject" class="text-red-500 text-sm">{{ errors.subject }}</span>
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300">Message</label>
        <textarea
          v-model="form.message"
          required
          :disabled="isSubmitting"
          class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white disabled:opacity-50"
          placeholder="Your Message (minimum 10 characters)"
          rows="4"
          minlength="10"
          maxlength="2000"
        ></textarea>
        <div class="flex justify-between text-sm text-gray-500">
          <span v-if="errors.message" class="text-red-500">{{ errors.message }}</span>
          <span class="ml-auto">{{ form.message.length }}/2000</span>
        </div>
      </div>
      <button
        type="submit"
        :disabled="isSubmitting || !isFormValid"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSubmitting ? 'Mengirim...' : 'Send' }}
      </button>
    </form>

    <!-- Pesan Sukses -->
    <div v-if="submitted" class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
      <strong>Berhasil!</strong> Pesan Anda telah dikirim.
    </div>

    <!-- Pesan Error -->
    <div v-if="errorMessage" class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <strong>Error:</strong> {{ errorMessage }}
      <button @click="errorMessage = ''" class="ml-2 text-red-600 hover:text-red-800">×</button>
    </div>

    <!-- Validation Errors -->
    <div v-if="validationErrors.length > 0" class="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
      <strong>Validation Errors:</strong>
      <ul class="mt-2 list-disc list-inside">
        <li v-for="error in validationErrors" :key="error.field">
          {{ error.message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitted = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')
const validationErrors = ref([])
const errors = ref({})

// Computed property untuk cek validitas form
const isFormValid = computed(() => {
  return form.value.name.length >= 2 &&
         form.value.email.length > 0 &&
         form.value.subject.length >= 5 &&
         form.value.message.length >= 10 &&
         form.value.message.length <= 2000
})

// Watch untuk real-time validation
watch(form, (newForm) => {
  errors.value = {}

  if (newForm.name.length > 0 && newForm.name.length < 2) {
    errors.value.name = 'Name must be at least 2 characters'
  }

  if (newForm.subject.length > 0 && newForm.subject.length < 5) {
    errors.value.subject = 'Subject must be at least 5 characters'
  }

  if (newForm.message.length > 0 && newForm.message.length < 10) {
    errors.value.message = 'Message must be at least 10 characters'
  }

  if (newForm.message.length > 2000) {
    errors.value.message = 'Message must be less than 2000 characters'
  }
}, { deep: true })

// Fungsi validasi manual
const validateForm = () => {
  const newErrors = {}

  if (!form.value.name || form.value.name.trim().length < 2) {
    newErrors.name = 'Name must be at least 2 characters'
  }

  if (!form.value.email || !form.value.email.includes('@')) {
    newErrors.email = 'Please enter a valid email'
  }

  if (!form.value.subject || form.value.subject.trim().length < 5) {
    newErrors.subject = 'Subject must be at least 5 characters'
  }

  if (!form.value.message || form.value.message.trim().length < 10) {
    newErrors.message = 'Message must be at least 10 characters'
  }

  if (form.value.message.trim().length > 2000) {
    newErrors.message = 'Message must be less than 2000 characters'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (isSubmitting.value) return

  // Reset states
  submitted.value = false
  errorMessage.value = ''
  validationErrors.value = []

  // Validasi form
  if (!validateForm()) {
    errorMessage.value = 'Please fix the validation errors above'
    return
  }

  isSubmitting.value = true

  try {
    console.log('Sending data:', form.value)

    const response = await axios.post('http://localhost:3000/api/contact', form.value, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Response:', response.data)
    submitted.value = true
    form.value = { name: '', email: '', subject: '', message: '' }
    errors.value = {}

  } catch (err) {
    console.error('Contact error:', err)

    if (err.response && err.response.data) {
      const responseData = err.response.data

      // Handle validation errors from backend
      if (responseData.errors && Array.isArray(responseData.errors)) {
        validationErrors.value = responseData.errors
        errorMessage.value = 'Please fix the validation errors below'
      } else {
        errorMessage.value = responseData.message || 'Terjadi kesalahan'
      }
    } else if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
      errorMessage.value = 'Tidak dapat terhubung ke server. Pastikan server backend berjalan di localhost:3000'
    } else if (err.response && err.response.status === 404) {
      errorMessage.value = 'Endpoint API tidak ditemukan. Periksa konfigurasi backend Anda.'
    } else if (err.code === 'ECONNABORTED') {
      errorMessage.value = 'Request timeout. Silakan coba lagi.'
    } else {
      errorMessage.value = 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
