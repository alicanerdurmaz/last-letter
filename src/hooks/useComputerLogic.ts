import { useCallback, useEffect, useRef, useState } from 'react'

import { useGameManagerCtx } from 'context/GameManager/GameManagerContext'
import { useSettingsCtx } from 'context/GameManager/SettingsContext'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'
import { findRandomWordFromNameList } from 'utils/findRandomWordFromNameList'
import { getRandomInt } from 'utils/getRandomInt'

export const useComputerLogic = () => {
  const { appLanguage } = useInternalizationCtx()
  const { gameDifficulty, turnTime } = useSettingsCtx()
  const { gameData, NAME_LIST, changeTurn, pauseGame } = useGameManagerCtx()
  const { currentWord } = gameData

  const [word, setWord] = useState('')

  const utterance = useRef(new SpeechSynthesisUtterance())
  const computerThinkTime = useRef(getRandomInt(2, turnTime - 2) * 1000)

  utterance.current.lang = appLanguage

  const playForComputer = useCallback(
    (word: string) => {
      // It's not fun that the computer can find words right away.
      // I wanted to simulate this. also allows the player to breathe
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

    // If currentWord is null, it means this is the first round.
    // first round, I am not running the odds calculation because we want the computer to find the word absolutely
    if (!currentWord || shouldComputerFindWord(gameDifficulty)) {
      const wordFounded = findRandomWordFromNameList({ currentWord, NAME_LIST, appLanguage })
      if (wordFounded) {
        timeOutId = playForComputer(wordFounded)
      }
    }
    return () => {
      clearTimeout(timeOutId)
      window.speechSynthesis.cancel()
    }
  }, [playForComputer, gameDifficulty, currentWord])

  return { word }
}

const shouldComputerFindWord = (computerChance: number) => {
  const randomInt = getRandomInt(0, 100)
  return computerChance >= randomInt
}
