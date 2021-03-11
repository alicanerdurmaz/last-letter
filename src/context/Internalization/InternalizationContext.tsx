import React, { createContext, useContext, useState } from 'react'
import { getLanguageFromLocalStorage } from '../../utils/getLanguageFromLocalStorage'
import enLanguage from './en.json'
import trLanguage from './tr.json'

export type languages = 'tr' | 'en'
export const supportedLanguages = ['en', 'tr']

interface ILanguageObject {
  en: { [key: string]: string }
  tr: { [key: string]: string }
}

interface IInternalizationCtx {
  t: (key: string) => string
  changeAppLanguage: (lang: string) => void
  appLanguage: languages
}

const InternalizationCtx = createContext<IInternalizationCtx | null>(null)

export const InternalizationProvider: React.FC = ({ children }) => {
  const [appLanguage, setAppLanguage] = useState<languages>(() => getLanguageFromLocalStorage())

  const [lang] = useState<ILanguageObject>({
    en: enLanguage,
    tr: trLanguage,
  })

  const t = (key: string) => {
    if (lang[appLanguage][key] === undefined) throw Error(`InternalizationCtx not have value with "${key}"`)

    return lang[appLanguage][key]
  }

  const changeAppLanguage = (lang: string) => {
    if (!supportedLanguages.includes(lang)) return

    setAppLanguage(lang as languages)
    localStorage.setItem('lang', lang)
  }

  return (
    <InternalizationCtx.Provider value={{ t, changeAppLanguage, appLanguage }}>{children}</InternalizationCtx.Provider>
  )
}

export const useInternalizationCtx = () => {
  const context = useContext(InternalizationCtx)
  if (!context || context === undefined) {
    throw new Error('InternalizationCtx must be used within a InternalizationProvider')
  }
  return context
}
