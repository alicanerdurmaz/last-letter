import { AppLangugage } from 'context/GameManager/SettingsContext'

export const getLanguageFromLocalStorage = (): AppLangugage => {
  const langFromlocalStorage = localStorage.getItem('lang')

  return langFromlocalStorage ? (langFromlocalStorage as AppLangugage) : ('tr-TR' as AppLangugage)
}
