import { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react'

import { checkWordIsInvalid } from '../../utils/checkWordIsInvalid'

import names from '../../data/names.json'

export const USER = {
  computer: 1,
  player: 2,
}
export type NameList = {
  [key: string]: string[]
}
export interface IGameManagerCtx {
  speechRecognized: (word: string) => void
  changeTurn: (word: string) => void

  pauseGame: () => void
  continueGame: () => void
  isGamePaused: () => boolean

  whoIsPlaying: number
  currentWord: string
  usedWords: Set<string>
  NAME_LIST: NameList
}

const GameManagerCtx = createContext<IGameManagerCtx | null>(null)

export const GameManagerProvider: React.FC = ({ children }) => {
  const NAME_LIST: NameList = useMemo(() => names, [])

  const pause = useRef(false)
  const [whoIsPlaying, setWhoIsPlaying] = useState(USER.computer)
  const [currentWord, setCurrentWord] = useState('')
  const [usedWords, setUsedWords] = useState(new Set<string>())

  console.log('GameManagerProvider:' + currentWord)

  const changeTurn = (word: string) => {
    pauseGame()

    if (whoIsPlaying === USER.computer) {
      setWhoIsPlaying(USER.player)
    } else {
      setWhoIsPlaying(USER.computer)
    }

    setCurrentWord(word)

    const newUsedWordList = new Set(usedWords)
    newUsedWordList.add(word.toLowerCase())
    setUsedWords(newUsedWordList)

    continueGame()
  }

  const speechRecognized = (word: string) => {
    if (checkWordIsInvalid(word, currentWord, NAME_LIST, usedWords)) {
      return
    }
    changeTurn(word)
  }

  const pauseGame = () => {
    pause.current = true
  }
  const continueGame = () => {
    setTimeout(() => {
      pause.current = false
    }, 500)
  }
  const isGamePaused = () => {
    return pause.current
  }
  return (
    <GameManagerCtx.Provider
      value={{
        pauseGame,
        continueGame,
        changeTurn,
        speechRecognized,
        isGamePaused,
        currentWord,
        usedWords,
        NAME_LIST,
        whoIsPlaying,
      }}>
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
