import { useCallback, useEffect, useRef, useState } from 'react'

import { useGameManagerCtx } from 'context/GameManager/GameManagerContext'
import { useSettingsCtx } from 'context/GameManager/SettingsContext'
import { findRandomWordFromNameList } from 'utils/findRandomWordFromNameList'
import { getRandomInt } from 'utils/getRandomInt'

export const useComputerLogic = () => {
  const { gameDifficulty, turnTime, appLanguage } = useSettingsCtx()
  const { gameData, NAME_LIST, changeTurn, pauseGame } = useGameManagerCtx()

  const [word, setWord] = useState('')

  const utterance = useRef(new SpeechSynthesisUtterance())
  const computerThinkTime = useRef(2 * 1000)

  utterance.current.lang = appLanguage

  const playForComputer = useCallback(
    (word: string) => {
      return setTimeout(() => {
        pauseGame()
        setWord(word)

        utterance.current.text = word
        window.speechSynthesis.speak(utterance.current)

        utterance.current.onend = function () {
          changeTurn(word)
        }
      }, computerThinkTime.current)
    },
    [changeTurn, pauseGame],
  )

  useEffect(() => {
    let timeOutId: any = undefined
    if (!gameData.currentWord || shouldComputerFindWord(gameDifficulty)) {
      const wordFounded = findRandomWordFromNameList(gameData.currentWord, NAME_LIST)

      if (wordFounded) {
        timeOutId = playForComputer(wordFounded)
      }
    }
    return () => {
      clearTimeout(timeOutId)
      window.speechSynthesis.cancel()
    }
  }, [playForComputer, gameDifficulty, gameData.currentWord])

  return { word }
}

const shouldComputerFindWord = (computerChance: number) => {
  const randomInt = getRandomInt(0, 100)

  return computerChance >= randomInt
}
