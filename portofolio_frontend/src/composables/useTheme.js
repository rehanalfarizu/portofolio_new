import { onMounted, ref } from 'vue'

export const useTheme = () => {
  const isDark = ref(false)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  onMounted(() => {
    const darkMode = localStorage.getItem('theme') === 'dark'
    isDark.value = darkMode
    document.documentElement.classList.toggle('dark', darkMode)
  })

  return { isDark, toggleTheme }
}
