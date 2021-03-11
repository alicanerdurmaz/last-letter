import React, { createContext, useContext, useState } from 'react'

export const GAME_DIFFICULTY = {
  easy: 1,
  normal: 2,
  hard: 3,
}
interface IGameManagerCtx {
  roundTime: number
  setRoundTime: React.Dispatch<React.SetStateAction<number>>
  setGameDifficulty: React.Dispatch<React.SetStateAction<number>>
}
const GameManagerCtx = createContext<IGameManagerCtx | null>(null)

export const GameManagerProvider: React.FC = ({ children }) => {
  const [roundTime, setRoundTime] = useState(8)
  const [gameDifficulty, setGameDifficulty] = useState(GAME_DIFFICULTY.easy)

  return (
    <GameManagerCtx.Provider value={{ roundTime, setRoundTime, setGameDifficulty }}>{children}</GameManagerCtx.Provider>
  )
}

export const useGameManagerCtx = () => {
  const context = useContext(GameManagerCtx)
  if (!context || context === undefined) {
    throw new Error('GameManagerCtx must be used within a GameManagerCtxProvider')
  }
  return context
}
