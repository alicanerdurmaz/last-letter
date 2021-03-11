import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import useInterval from '../../hooks/useInterval'
import { checkWordIsInvalid } from '../../utils/checkWordIsInvalid'
import { useSettingsCtx } from './SettingsContext'
import names from '../../data/names.json'

export const USER = {
  computer: 1,
  player: 2,
}
export type NameList = {
  [key: string]: string[]
}
interface IGameManagerCtx {
  speechRecognized: (word: string) => void
  remainingTime: number
  whoIsPlaying: number
  currentWord: string
}
const GameManagerCtx = createContext<IGameManagerCtx | null>(null)

export const GameManagerProvider: React.FC = ({ children }) => {
  const NAME_LIST: NameList = useMemo(() => names, [])
  const { turnTime } = useSettingsCtx()
  const [remainingTime, setRemainingTime] = useState(turnTime)
  const [whoIsPlaying, setWhoIsPlaying] = useState(USER.computer)
  const [currentWord, setCurrentWord] = useState('')
  const [usedWords, setUsedWords] = useState(new Set<string>())

  const changeTurn = useCallback(
    (word: string) => {
      setCurrentWord(word)

      const newUsedWordList = new Set(usedWords)
      newUsedWordList.add(word.toLowerCase())
      setUsedWords(newUsedWordList)

      if (whoIsPlaying === USER.computer) {
        setWhoIsPlaying(USER.player)
      } else {
        setWhoIsPlaying(USER.computer)
      }

      setRemainingTime(turnTime)
    },
    [turnTime, whoIsPlaying, usedWords]
  )

  const speechRecognized = (word: string) => {
    if (checkWordIsInvalid(word, currentWord, NAME_LIST, usedWords)) {
      return
    }

    changeTurn(word)
  }

  useEffect(() => {
    if (remainingTime < 0) {
      changeTurn('Test')
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
