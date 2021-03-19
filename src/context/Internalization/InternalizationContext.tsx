import { createContext, useContext, useState, useCallback } from 'react'

import { useSettingsCtx } from 'context/GameManager/SettingsContext'
import enLanguage from 'context/Internalization/en.json'
import trLanguage from 'context/Internalization/tr.json'

interface ILanguageObject {
  'en-US': { [key: string]: string }
  'tr-TR': { [key: string]: string }
}

interface IInternalizationCtx {
  t: (key: string) => string
}

const InternalizationCtx = createContext<IInternalizationCtx | null>(null)

export const InternalizationProvider: React.FC = ({ children }) => {
  const { appLanguage } = useSettingsCtx()

  const [lang] = useState<ILanguageObject>({
    'en-US': enLanguage,
    'tr-TR': trLanguage,
  })

  const t = useCallback(
    (key: string) => {
      if (lang[appLanguage][key] === undefined) {
        console.error(`InternalizationCtx not have value with "${key}"`)
        return ''
      }

      return lang[appLanguage][key]
    },
    [appLanguage, lang],
  )

  return <InternalizationCtx.Provider value={{ t }}>{children}</InternalizationCtx.Provider>
}

export const useInternalizationCtx = () => {
  const context = useContext(InternalizationCtx)
  if (!context || context === undefined) {
    throw new Error('InternalizationCtx must be used within a InternalizationProvider')
  }
  return context
}
