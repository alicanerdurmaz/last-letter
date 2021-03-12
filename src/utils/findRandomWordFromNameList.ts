import { NameList } from '../context/GameManager/GameManagerContext'

const findRandomLetter = () => {
  const alphabet = 'aâbcçdefghiıjklmnoöprsştuüvwyz'

  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

export const findRandomWordFromNameList = (currentWord: string, NameList: NameList) => {
  const lastLetter = !currentWord ? findRandomLetter() : currentWord[currentWord.length - 1]

  console.log({ lastLetter })
  const listStartingWithTheLastLetter = NameList[lastLetter]
  const listLength = listStartingWithTheLastLetter.length

  return listStartingWithTheLastLetter[Math.floor(Math.random() * listLength)]
}
