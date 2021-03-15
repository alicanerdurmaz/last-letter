import { createContext, useContext, useEffect, useState } from 'react'

import { useGameManagerCtx } from 'context/GameManager/GameManagerContext'
import { useSettingsCtx } from 'context/GameManager/SettingsContext'
import useInterval from 'hooks/useInterval'

interface IGameLoopCtx {
  remainingTime: number
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>
}

const GameLoopCtx = createContext<IGameLoopCtx | null>(null)

export const GameLoopProvider: React.FC = ({ children }) => {
  const { turnTime } = useSettingsCtx()
  const { isGamePaused, gameData, pauseGame, gameOver } = useGameManagerCtx()
  const [remainingTime, setRemainingTime] = useState(turnTime)

  useEffect(() => {
    setRemainingTime(turnTime)
  }, [gameData.whoIsPlaying, turnTime])

  useEffect(() => {
    if (isGamePaused()) return

    if (remainingTime < 0) {
      gameOver('timesUp')
    }
  }, [pauseGame, remainingTime, gameOver, isGamePaused])

  useInterval(() => {
    if (isGamePaused()) return
    setRemainingTime(prevState => prevState - 1)
  }, 1000)

  return <GameLoopCtx.Provider value={{ remainingTime, setRemainingTime }}>{children}</GameLoopCtx.Provider>
}

export const useGameLoopCtx = () => {
  const context = useContext(GameLoopCtx)
  if (!context || context === undefined) {
    throw new Error('GameLoopCtx must be used within a GameLoopProvider')
  }
  return context
}
