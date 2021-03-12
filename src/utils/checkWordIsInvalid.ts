import { NameList } from '../context/GameManager/GameManagerContext'

export const checkWordIsInvalid = (
  newWord: string,
  currentWord: string,
  NAME_LIST: NameList,
  usedWords: Set<string>
) => {
  console.log(currentWord)
  if (!currentWord) return false

  const lowerNewWord = newWord.toLocaleLowerCase('tr')
  const lowerCurrentWord = currentWord.toLocaleLowerCase('tr')

  const newWordFirstChar = lowerNewWord[0]
  const currentWordLastChar = lowerCurrentWord[lowerCurrentWord.length - 1]

  if (lowerNewWord.includes('*')) {
    return `[${lowerNewWord}] User used bad language `
  }
  if (newWordFirstChar !== currentWordLastChar) {
    return `[${lowerCurrentWord}] Last char not equal to [${lowerNewWord}] first char`
  }

  if (usedWords.has(lowerNewWord)) {
    return `[${lowerNewWord}] used before`
  }

  if (!NAME_LIST[newWordFirstChar].includes(lowerNewWord)) {
    return `[${lowerNewWord}] is not a name`
  }

  return false
}
