import { useCallback, useEffect, useRef, useState } from 'react'
import { useGameManagerCtx } from '../context/GameManager/GameManagerContext'
import { findRandomWordFromNameList } from '../utils/findRandomWordFromNameList'
import { getRandomInt } from '../utils/getRandomInt'

export const useComputerLogic = () => {
  const { currentWord, NAME_LIST, changeTurn } = useGameManagerCtx()

  const findWord = useRef(findRandomWordFromNameList(currentWord, NAME_LIST))
  const computerThinkTime = useRef(getRandomInt(3, 6) * 1000)
  const [word, setWord] = useState('')

  const playForComputer = useCallback(
    (word: string) => {
      setTimeout(() => {
        setWord(word)
      }, computerThinkTime.current - 1000)

      setTimeout(() => {
        changeTurn(word)
      }, computerThinkTime.current)
    },
    [changeTurn],
  )

  useEffect(() => {
    if (findWord.current) playForComputer(findWord.current)
  }, [playForComputer])

  return { word }
}
