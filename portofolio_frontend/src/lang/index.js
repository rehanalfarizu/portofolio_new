import { reactive } from 'vue'
import en from './en'
import id from './id'

const currentLang = reactive({ locale: 'en' })

const t = (key) => {
  const langData = currentLang.locale === 'id' ? id : en
  return langData[key] || key
}

const changeLang = (locale) => {
  currentLang.locale = locale
  localStorage.setItem('language', locale)
}

// Load saved language on init
const savedLang = localStorage.getItem('language')
if (savedLang) {
  currentLang.locale = savedLang
}

export { currentLang, t, changeLang }
