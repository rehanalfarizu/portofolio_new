// contactService.js
import api from './api';

export const contactService = {
  // Test connection
  testConnection: async () => {
    try {
      console.log('🧪 Testing backend connection...');
      const response = await api.get('/api/contact/test');
      console.log('✅ Connection test successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Connection test failed:', error);

      let errorMessage = 'Tidak dapat terhubung ke server';

      if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Server tidak berjalan. Pastikan backend berjalan di localhost:3000';
      } else if (error.response?.status === 404) {
        errorMessage = 'Endpoint test tidak ditemukan';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Koneksi timeout';
      }

      throw new Error(errorMessage);
    }
  },

  // Send contact form
  sendContact: async (contactData) => {
    try {
      console.log('📧 Sending contact data:', contactData);

      // Validasi data sebelum dikirim
      if (!contactData.name || !contactData.email || !contactData.message) {
        throw new Error('Semua field harus diisi');
      }

      const response = await api.post('/api/contact', contactData);
      console.log('✅ Contact sent successfully:', response.data);

      return response.data;

    } catch (error) {
      console.error('❌ Contact send failed:', error);

      let errorMessage = 'Gagal mengirim pesan';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = 'Data yang dikirim tidak valid';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Silakan coba lagi nanti';
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Server tidak berjalan. Pastikan backend berjalan di localhost:3000';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Silakan coba lagi';
      }

      throw new Error(errorMessage);
    }
  }
};
