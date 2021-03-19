import { createContext, useContext, useState, useCallback } from 'react'

import { getLanguageFromLocalStorage } from 'utils/getLanguageFromLocalStorage'

export const GAME_DIFFICULTY = {
  easy: 30,
  normal: 50,
  hard: 70,
  impossible: 100,
}

export type AppLangugage = 'tr-TR' | 'en-US'
interface ISettingsCtx {
  appLanguage: AppLangugage
  changeAppLanguage: (lang: string) => void
  turnTime: number
  setTurnTime: React.Dispatch<React.SetStateAction<number>>
  gameDifficulty: number
  setGameDifficulty: React.Dispatch<React.SetStateAction<number>>
}

const SettingsCtx = createContext<ISettingsCtx | null>(null)

export const SettingsProvider: React.FC = ({ children }) => {
  const [appLanguage, setAppLanguage] = useState<AppLangugage>(() => getLanguageFromLocalStorage())
  const [turnTime, setTurnTime] = useState(8)
  const [gameDifficulty, setGameDifficulty] = useState(GAME_DIFFICULTY.easy)

  const changeAppLanguage = useCallback((lang: string) => {
    setAppLanguage(lang as AppLangugage)
    localStorage.setItem('lang', lang)
  }, [])

  return (
    <SettingsCtx.Provider
      value={{ appLanguage, changeAppLanguage, turnTime, setTurnTime, setGameDifficulty, gameDifficulty }}
    >
      {children}
    </SettingsCtx.Provider>
  )
}

export const useSettingsCtx = () => {
  const context = useContext(SettingsCtx)
  if (!context || context === undefined) {
    throw new Error('SettingsCtx must be used within a SettingsCtxProvider')
  }
  return context
}
