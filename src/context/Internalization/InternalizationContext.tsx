import React, { createContext, useContext, useState } from 'react'
import enLanguage from './en.json'
import trLanguage from './tr.json'

type languages = 'tr' | 'en'

interface ILanguageObject {
  en: { [key: string]: string }
  tr: { [key: string]: string }
}

interface IInternalizationCtx {
  t: (key: string) => string
  setLanguage: React.Dispatch<React.SetStateAction<languages>>
}

const InternalizationCtx = createContext<IInternalizationCtx | null>(null)

export const InternalizationProvider: React.FC = ({ children }) => {
  const [appLanguage, setLanguage] = useState<languages>('en')

  const [lang] = useState<ILanguageObject>({
    en: enLanguage,
    tr: trLanguage,
  })

  const t = (key: string) => {
    if (lang[appLanguage][key] === undefined) throw Error(`InternalizationCtx not have value with "${key}"`)

    return lang[appLanguage][key]
  }

  return <InternalizationCtx.Provider value={{ t, setLanguage }}>{children}</InternalizationCtx.Provider>
}

export const useInternalizationCtx = () => {
  const context = useContext(InternalizationCtx)
  if (!context || context === undefined) {
    throw new Error('InternalizationCtx must be used within a InternalizationProvider')
  }
  return context
}
