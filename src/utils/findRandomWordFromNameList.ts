import { NameList } from 'context/GameManager/GameManagerContext'
import { AppLangugage } from 'context/Internalization/InternalizationContext'

const findRandomLetter = (appLanguage: AppLangugage) => {
  const turkishAlphabet = 'aâbcçdefghiıjklmnoöprsştuüvwyz'
  const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz'

  const alphabet = appLanguage === 'tr-TR' ? turkishAlphabet : englishAlphabet
  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

interface IFindRandomWordFromNameList {
  currentWord: string
  NAME_LIST: NameList
  appLanguage: AppLangugage
}

export const findRandomWordFromNameList = ({ currentWord, NAME_LIST, appLanguage }: IFindRandomWordFromNameList) => {
  let lastLetter = !currentWord ? findRandomLetter(appLanguage) : currentWord[currentWord.length - 1]

  const listStartingWithTheLastLetter = NAME_LIST[lastLetter]

  if (!listStartingWithTheLastLetter) {
    return null
  }
  const listLength = listStartingWithTheLastLetter.length

  return listStartingWithTheLastLetter[Math.floor(Math.random() * listLength)]
}
