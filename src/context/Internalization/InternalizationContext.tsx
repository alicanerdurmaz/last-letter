import { createContext, useContext, useState, useCallback, useMemo } from 'react'

import enLanguage from 'context/Internalization/en.json'
import trLanguage from 'context/Internalization/tr.json'
import { getLanguageFromLocalStorage } from 'utils/getLanguageFromLocalStorage'

export type AppLangugage = 'tr-TR' | 'en-US'
interface ILanguageObject {
  'en-US': { [key: string]: string }
  'tr-TR': { [key: string]: string }
}

interface IInternalizationCtx {
  appLanguage: AppLangugage
  setAppLanguage: React.Dispatch<React.SetStateAction<AppLangugage>>
  t: (key: string) => string
}

const InternalizationCtx = createContext<IInternalizationCtx | null>(null)

export const InternalizationProvider: React.FC = ({ children }) => {
  const [appLanguage, setAppLanguage] = useState<AppLangugage>(() => getLanguageFromLocalStorage())

  const lang = useMemo<ILanguageObject>(() => {
    return {
      'en-US': enLanguage,
      'tr-TR': trLanguage,
    }
  }, [])

  const t = useCallback(
    (key: string) => {
      if (lang[appLanguage][key] === undefined) {
        console.error(`InternalizationCtx not have value with "${key}"`)
        return ''
      }

      return lang[appLanguage][key]
    },
    [appLanguage],
  )

  return (
    <InternalizationCtx.Provider value={{ appLanguage, setAppLanguage, t }}>{children}</InternalizationCtx.Provider>
  )
}

export const useInternalizationCtx = () => {
  const context = useContext(InternalizationCtx)
  if (!context || context === undefined) {
    throw new Error('InternalizationCtx must be used within a InternalizationProvider')
  }
  return context
}
