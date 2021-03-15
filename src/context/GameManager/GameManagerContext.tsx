import { createContext, useContext, useState, useMemo, useRef } from 'react'

import { useAuthContext } from 'context/Auth/AuthContext'
import names from 'data/names.json'
import { useFirestore } from 'hooks/useFirebase'
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
  score: number
}

const GameManagerCtx = createContext<IGameManagerCtx | null>(null)

export const GameManagerProvider: React.FC = ({ children }) => {
  const { currentUser } = useAuthContext()
  const NAME_LIST: NameList = useMemo(() => names, [])
  const pause = useRef(false)

  const [isGameOver, setIsGameOver] = useState<IsGameOver | null>(null)

  const [gameData, setGameData] = useState<IGameData>({
    whoIsPlaying: USER.computer,
    currentWord: '',
    usedWords: new Set<string>(),
    score: 0,
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
        score: prevState.whoIsPlaying === USER.computer ? prevState.score : prevState.score + 10,
      }
    })

    continueGame()
  }

  const speechRecognized = (word: string) => {
    changeTurn(word)
  }

  const GameOver = (desc: string) => {
    pauseGame()
    saveScoreToFirestore()
    setIsGameOver({
      winner: gameData.whoIsPlaying === USER.computer ? USER.player : USER.computer,
      description: desc,
    })
  }

  const saveScoreToFirestore = async () => {
    if (!currentUser) return

    if (currentUser.score >= gameData.score) return

    const { firestore } = await useFirestore()

    const displayName = currentUser?.user?.displayName || undefined

    try {
      firestore.collection('users').doc(displayName).set({
        username: displayName,
        score: gameData.score,
      })
    } catch (error) {}
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
