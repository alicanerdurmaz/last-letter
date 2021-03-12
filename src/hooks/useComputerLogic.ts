import { useEffect, useRef } from 'react'
import { NameList } from '../context/GameManager/GameManagerContext'
import { findRandomWordFromNameList } from '../utils/findRandomWordFromNameList'

export const useComputerLogic = (
  currentWord: string,
  usedWords: Set<string>,
  NAME_LIST: NameList,
  changeTurn: (word: string) => void
) => {
  const word = useRef(findRandomWordFromNameList(currentWord, NAME_LIST))

  useEffect(() => {
    setTimeout(() => {
      changeTurn(word.current)
    }, 2000)
  }, [changeTurn])
}
