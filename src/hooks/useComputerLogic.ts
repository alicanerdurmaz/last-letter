import { useEffect } from 'react'
import { NameList } from '../context/GameManager/GameManagerContext'
import { findRandomWordFromNameList } from '../utils/findRandomWordFromNameList'

export const useComputerLogic = (
  currentWord: string,
  usedWords: Set<string>,
  NAME_LIST: NameList,
  changeTurn: (word: string) => void
) => {
  useEffect(() => {
    const word = findRandomWordFromNameList(currentWord, NAME_LIST)
    setTimeout(() => {
      changeTurn(word)
    }, 2000)
  }, [currentWord, NAME_LIST, changeTurn])
}
