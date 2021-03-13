import { createContext, useContext, useState, useMemo, useRef } from 'react'

import { checkWordIsInvalid } from '../../utils/checkWordIsInvalid'

import names from '../../data/names.json'

export const USER = {
  computer: 1,
  player: 2,
}
export type IsGameOver = {
  winner: number
  description: string
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
  GameOver: (desc: string) => void

  isGameOver: IsGameOver | null
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
  const [isGameOver, setIsGameOver] = useState<IsGameOver | null>(null)

  const changeTurn = (word: string) => {
    pauseGame()

    setCurrentWord(word)

    const newUsedWordList = new Set(usedWords)
    newUsedWordList.add(word.toLowerCase())
    setUsedWords(newUsedWordList)

    if (whoIsPlaying === USER.computer) {
      setWhoIsPlaying(USER.player)
    } else {
      setWhoIsPlaying(USER.computer)
    }

    continueGame()
  }

  const speechRecognized = (word: string) => {
    const result = checkWordIsInvalid({ newWord: word, NAME_LIST, currentWord, usedWords })
    if (result) {
      GameOver(result)
      return
    }
    changeTurn(word)
  }

  const GameOver = (desc: string) => {
    pauseGame()
    setIsGameOver({
      winner: whoIsPlaying === USER.computer ? USER.player : USER.computer,
      description: desc,
    })
  }

  const pauseGame = () => {
    pause.current = true
  }
  const continueGame = () => {
    setTimeout(() => {
      pause.current = false
    }, 1000)
  }
  const isGamePaused = () => {
    return pause.current
  }
  return (
    <GameManagerCtx.Provider
      value={{
        GameOver,
        pauseGame,
        continueGame,
        changeTurn,
        speechRecognized,
        isGamePaused,

        isGameOver,
        currentWord,
        usedWords,
        NAME_LIST,
        whoIsPlaying,
      }}
    >
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
