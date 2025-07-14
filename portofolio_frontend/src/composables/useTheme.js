import { reactive, watch } from 'vue'

const theme = reactive({
  current: 'dark'
})

const toggleTheme = () => {
  theme.current = theme.current === 'dark' ? 'light' : 'dark'
  updateTheme()
}

const setTheme = (newTheme) => {
  theme.current = newTheme
  updateTheme()
}

const updateTheme = () => {
  document.documentElement.setAttribute('data-theme', theme.current)
  localStorage.setItem('theme', theme.current)
}

const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme) {
    theme.current = savedTheme
  } else if (prefersDark) {
    theme.current = 'dark'
  } else {
    theme.current = 'light'
  }

  updateTheme()
}

// Watch for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      theme.current = e.matches ? 'dark' : 'light'
      updateTheme()
    }
  })
}

export { theme, toggleTheme, setTheme, initTheme }
