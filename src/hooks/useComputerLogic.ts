import { useCallback, useEffect, useRef, useState } from 'react'

import { useGameManagerCtx } from 'context/GameManager/GameManagerContext'
import { useSettingsCtx } from 'context/GameManager/SettingsContext'
import { findRandomWordFromNameList } from 'utils/findRandomWordFromNameList'
import { getRandomInt } from 'utils/getRandomInt'

export const useComputerLogic = () => {
  const utterance = useRef(new SpeechSynthesisUtterance())
  utterance.current.lang = 'tr-TR'

  const { gameDifficulty, turnTime } = useSettingsCtx()
  const { gameData, NAME_LIST, changeTurn, pauseGame } = useGameManagerCtx()

  const computerThinkTime = useRef(getRandomInt(2, turnTime - 1) * 1000)
  const [word, setWord] = useState('')

  const playForComputer = useCallback(
    (word: string) => {
      return setTimeout(() => {
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
