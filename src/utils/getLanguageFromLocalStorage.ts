import { languages, supportedLanguages } from '../context/Internalization/InternalizationContext'

export const getLanguageFromLocalStorage = () => {
  const langFromlocalStorage = localStorage.getItem('lang')

  if (langFromlocalStorage && supportedLanguages.includes(langFromlocalStorage))
    return langFromlocalStorage as languages

  return 'en'
}
