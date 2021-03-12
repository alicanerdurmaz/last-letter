import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useGameManagerCtx } from './GameManagerContext'
import useInterval from '../../hooks/useInterval'

interface IGameLoopCtx {
  remainingTime: number
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>
}

const GameLoopCtx = createContext<IGameLoopCtx | null>(null)

export const GameLoopProvider: React.FC = ({ children }) => {
  const { changeTurn, pauseGame, continueGame, isGamePaused } = useGameManagerCtx()
  const [remainingTime, setRemainingTime] = useState(8)

  useEffect(() => {
    if (remainingTime <= 0) {
      pauseGame()

      changeTurn('Test')
      setRemainingTime(8)

      continueGame()
    }
  }, [changeTurn, continueGame, pauseGame, remainingTime])

  useInterval(() => {
    if (isGamePaused()) return
    setRemainingTime((prevState) => prevState - 1)
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
