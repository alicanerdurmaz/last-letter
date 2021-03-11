import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import useInterval from '../../hooks/useInterval'
import { useSettingsCtx } from './SettingsContext'

export const USER = {
  computer: 1,
  player: 2,
}
interface IGameManagerCtx {
  remainingTime: number
  gameData: {
    currentUser: number
  }
}
const GameManagerCtx = createContext<IGameManagerCtx | null>(null)

export const GameManagerProvider: React.FC = ({ children }) => {
  const { turnTime } = useSettingsCtx()
  const [remainingTime, setRemainingTime] = useState(turnTime)

  const [gameData, setGameData] = useState({
    currentUser: USER.computer,
  })

  const changeTurn = useCallback(() => {
    if (gameData.currentUser === USER.computer) {
      setGameData({ currentUser: USER.player })
    } else {
      setGameData({ currentUser: USER.computer })
    }

    setRemainingTime(turnTime)
  }, [turnTime, gameData.currentUser])

  useEffect(() => {
    if (remainingTime < 0) {
      changeTurn()
    }
  }, [changeTurn, remainingTime])

  useInterval(() => {
    setRemainingTime((prevState) => prevState - 1)
  }, 1000)

  return <GameManagerCtx.Provider value={{ remainingTime, gameData }}>{children}</GameManagerCtx.Provider>
}

export const useGameManagerCtx = () => {
  const context = useContext(GameManagerCtx)
  if (!context || context === undefined) {
    throw new Error('GameManagerCtx must be used within a GameManagerCtxProvider')
  }
  return context
}
