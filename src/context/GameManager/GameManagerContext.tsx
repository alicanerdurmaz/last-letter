import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import useInterval from '../../hooks/useInterval'
import { useSettingsCtx } from './SettingsContext'

export const USER = {
  computer: 1,
  player: 2,
}
interface IGameManagerCtx {
  speechRecognized: (text: string) => void
  remainingTime: number
  whoIsPlaying: number
  currentWord: string
}
const GameManagerCtx = createContext<IGameManagerCtx | null>(null)

export const GameManagerProvider: React.FC = ({ children }) => {
  const { turnTime } = useSettingsCtx()
  const [remainingTime, setRemainingTime] = useState(turnTime)
  const [whoIsPlaying, setWhoIsPlaying] = useState(USER.computer)
  const [currentWord, setCurrentWord] = useState('')

  const changeTurn = useCallback(() => {
    if (whoIsPlaying === USER.computer) {
      setWhoIsPlaying(USER.player)
    } else {
      setWhoIsPlaying(USER.computer)
    }

    setRemainingTime(turnTime)
  }, [turnTime, whoIsPlaying])

  const speechRecognized = (text: string) => {
    console.log(text)
    setCurrentWord(text)
    changeTurn()
  }

  useEffect(() => {
    if (remainingTime < 0) {
      changeTurn()
    }
  }, [changeTurn, remainingTime])

  useInterval(() => {
    setRemainingTime((prevState) => prevState - 1)
  }, 1000)

  return (
    <GameManagerCtx.Provider value={{ remainingTime, whoIsPlaying, speechRecognized, currentWord }}>
      {children}
    </GameManagerCtx.Provider>
  )
}

export const useGameManagerCtx = () => {
  const context = useContext(GameManagerCtx)
  if (!context || context === undefined) {
    throw new Error('GameManagerCtx must be used within a GameManagerCtxProvider')
  }
  return context
}
