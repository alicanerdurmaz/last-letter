import { NameList } from '../context/GameManager/GameManagerContext'

const findRandomLetter = () => {
  const alphabet = 'abcdefghijklmnoprstuvwxyz'

  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

export const findRandomWordFromNameList = (currentWord: string, NameList: NameList) => {
  const firstLetter = !!currentWord ? currentWord[currentWord.length - 1] : findRandomLetter()

  const listStartingWithTheFirstLetter = NameList[firstLetter]
  const listLength = listStartingWithTheFirstLetter.length

  return listStartingWithTheFirstLetter[Math.floor(Math.random() * listLength)]
}
