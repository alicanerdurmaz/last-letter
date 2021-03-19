import { AppLangugage } from 'context/Internalization/InternalizationContext'

export const getLanguageFromLocalStorage = (): AppLangugage => {
  const langFromlocalStorage = localStorage.getItem('lang')

  return langFromlocalStorage ? (langFromlocalStorage as AppLangugage) : ('tr-TR' as AppLangugage)
}
