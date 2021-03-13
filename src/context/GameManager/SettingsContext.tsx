import React, { createContext, useContext, useState } from 'react'

export const GAME_DIFFICULTY = {
  easy: 30,
  normal: 50,
  hard: 70,
  impossible: 100,
}
interface ISettingsCtx {
  turnTime: number
  setTurnTime: React.Dispatch<React.SetStateAction<number>>
  gameDifficulty: number
  setGameDifficulty: React.Dispatch<React.SetStateAction<number>>
}
const SettingsCtx = createContext<ISettingsCtx | null>(null)

export const SettingsProvider: React.FC = ({ children }) => {
  const [turnTime, setTurnTime] = useState(8)
  const [gameDifficulty, setGameDifficulty] = useState(GAME_DIFFICULTY.easy)

  return (
    <SettingsCtx.Provider value={{ turnTime, setTurnTime, setGameDifficulty, gameDifficulty }}>
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
