import { createContext, useContext, useState, useMemo, useRef } from 'react'

import { useAuthContext } from 'context/Auth/AuthContext'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'
import { Routes, useRouterContext } from 'context/Router/RouterContext'
import englishNames from 'data/english-names.json'
import turkishNames from 'data/turkish-names.json'
import { getFireStore } from 'hooks/useFirebase'
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
  gameOver: (desc: string, lastUsedWord?: string) => void

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
  const { appLanguage } = useInternalizationCtx()
  const { changeRoute } = useRouterContext()
  const { currentUser } = useAuthContext()
  const pause = useRef(false)

  const NAME_LIST: NameList = useMemo(() => (appLanguage === 'tr-TR' ? turkishNames : englishNames), [appLanguage])

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
      appLanguage: appLanguage,
    })

    if (result) {
      gameOver(result, word)
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

  const gameOver = (desc: string, lastUsedWord?: string) => {
    pauseGame()
    saveScoreToFirestore()

    const gameOverScreenProps = {
      winner: gameData.whoIsPlaying === USER.computer ? USER.player : USER.computer,
      description: desc,
      usedWords: gameData.usedWords,
      lastUsedWord: lastUsedWord || undefined,
    }
    changeRoute(Routes.gameOver, gameOverScreenProps)
  }

  const saveScoreToFirestore = async () => {
    if (!currentUser) return

    if (currentUser.score >= gameData.score) return

    const { firestore } = await getFireStore()

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
        gameOver,
        pauseGame,
        continueGame,
        changeTurn,
        speechRecognized,
        isGamePaused,

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
