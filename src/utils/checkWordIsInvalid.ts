import { NameList } from 'context/GameManager/GameManagerContext'
import { AppLangugage } from 'context/Internalization/InternalizationContext'

interface IProps {
  newWord: string
  currentWord: string
  NAME_LIST: NameList
  usedWords: Set<string>
  appLanguage: AppLangugage
}

export const checkWordIsInvalid = ({ NAME_LIST, currentWord, newWord, usedWords, appLanguage }: IProps) => {
  if (!currentWord) return false

  const lowerNewWord = newWord.toLocaleLowerCase(appLanguage)
  const lowerCurrentWord = currentWord.toLocaleLowerCase(appLanguage)

  const newWordFirstChar = lowerNewWord[0]
  const currentWordLastChar = lowerCurrentWord[lowerCurrentWord.length - 1]

  if (lowerNewWord.includes('*')) {
    return `badLanguage`
  }
  if (newWordFirstChar !== currentWordLastChar) {
    return `lastCharNotEqualToFirstChar`
  }

  if (usedWords.has(lowerNewWord)) {
    return `usedBefore`
  }

  if (!NAME_LIST[newWordFirstChar].includes(lowerNewWord)) {
    return `notAName`
  }

  return false
}
