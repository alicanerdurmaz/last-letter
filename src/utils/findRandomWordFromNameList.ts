import { NameList } from '../context/GameManager/GameManagerContext'

const findRandomLetter = () => {
  const alphabet = 'aâbcçdefghiıjklmnoöprsştuüvwyz'

  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

export const findRandomWordFromNameList = (currentWord: string, NameList: NameList) => {
  let lastLetter = !currentWord ? findRandomLetter() : currentWord[currentWord.length - 1]

  const listStartingWithTheLastLetter = NameList[lastLetter]

  if (!listStartingWithTheLastLetter) {
    return null
  }
  const listLength = listStartingWithTheLastLetter.length

  return listStartingWithTheLastLetter[Math.floor(Math.random() * listLength)]
}
