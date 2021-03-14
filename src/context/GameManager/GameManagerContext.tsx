import { createContext, useContext, useState, useMemo, useRef } from 'react'

import names from 'data/names.json'
import { checkWordIsInvalid } from 'utils/checkWordIsInvalid'

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
  NAME_LIST: NameList
  gameData: IGameData
}

interface IGameData {
  whoIsPlaying: number
  currentWord: string
  usedWords: Set<string>
}

const GameManagerCtx = createContext<IGameManagerCtx | null>(null)

export const GameManagerProvider: React.FC = ({ children }) => {
  const NAME_LIST: NameList = useMemo(() => names, [])

  const pause = useRef(false)

  const [isGameOver, setIsGameOver] = useState<IsGameOver | null>(null)

  const [gameData, setGameData] = useState<IGameData>({
    whoIsPlaying: USER.computer,
    currentWord: '',
    usedWords: new Set<string>(),
  })

  const changeTurn = (word: string) => {
    pauseGame()

    const result = checkWordIsInvalid({
      newWord: word,
      NAME_LIST,
      currentWord: gameData.currentWord,
      usedWords: gameData.usedWords,
    })
    if (result) {
      GameOver(result)
      return
    }

    const newUsedWordList = new Set(gameData.usedWords)
    newUsedWordList.add(word.toLowerCase())

    setGameData(prevState => {
      return {
        currentWord: word,
        whoIsPlaying: prevState.whoIsPlaying === USER.computer ? USER.player : USER.computer,
        usedWords: newUsedWordList,
      }
    })

    continueGame()
  }

  const speechRecognized = (word: string) => {
    changeTurn(word)
  }

  const GameOver = (desc: string) => {
    pauseGame()
    setIsGameOver({
      winner: gameData.whoIsPlaying === USER.computer ? USER.player : USER.computer,
      description: desc,
    })
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
        GameOver,
        pauseGame,
        continueGame,
        changeTurn,
        speechRecognized,
        isGamePaused,

        isGameOver,
        gameData,
        NAME_LIST,
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
