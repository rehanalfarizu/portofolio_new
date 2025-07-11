import { reactive } from 'vue'
import en from './en'
import id from './id'

const currentLang = reactive({ locale: 'en' })

const t = (key) => {
  const langData = currentLang.locale === 'id' ? id : en
  return langData[key] || key
}

export { currentLang, t }
