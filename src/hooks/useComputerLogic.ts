import { useCallback, useEffect, useRef, useState } from 'react'
import { useGameManagerCtx } from '../context/GameManager/GameManagerContext'
import { useSettingsCtx } from '../context/GameManager/SettingsContext'
import { findRandomWordFromNameList } from '../utils/findRandomWordFromNameList'
import { getRandomInt } from '../utils/getRandomInt'

export const useComputerLogic = () => {
  const utterance = useRef(new SpeechSynthesisUtterance())
  utterance.current.lang = localStorage.getItem('lang') || 'tr-TR'

  const { gameDifficulty } = useSettingsCtx()
  const { gameData, NAME_LIST, changeTurn, pauseGame } = useGameManagerCtx()

  const findWord = useRef(findRandomWordFromNameList(gameData.currentWord, NAME_LIST))
  const computerThinkTime = useRef(getRandomInt(2, 6) * 1000)
  const [word, setWord] = useState('')

  const playForComputer = useCallback(
    (word: string) => {
      setTimeout(() => {
        pauseGame()
        setWord(word)

        utterance.current.text = word
        window.speechSynthesis.speak(utterance.current)

        utterance.current.onend = function (e) {
          changeTurn(word)
        }
      }, computerThinkTime.current)
    },
    [changeTurn, pauseGame],
  )

  useEffect(() => {
    if (!shouldComputerFindWord(gameDifficulty)) return

    if (findWord.current) playForComputer(findWord.current)
  }, [playForComputer, gameDifficulty, gameData.currentWord])

  return { word }
}

const shouldComputerFindWord = (computerChance: number) => {
  const randomInt = getRandomInt(0, 100)
  return computerChance >= randomInt
}
