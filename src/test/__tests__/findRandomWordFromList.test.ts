import NAME_LIST from 'data/turkish-names.json'
import { findRandomWordFromNameList } from 'utils/findRandomWordFromNameList'

describe('find a word from list that begins with the last letter of the given word', () => {
  const appLanguage = 'tr-TR'
  test('word found', () => {
    const currentWord = 'test'
    const currentWordLastLetter = currentWord[currentWord.length - 1]

    const resultWithWord = findRandomWordFromNameList({
      currentWord,
      NAME_LIST,
      appLanguage,
    }) as string

    const resultWithEmptyString = findRandomWordFromNameList({ currentWord: '', NAME_LIST, appLanguage }) as string

    expect(resultWithWord).toBeTruthy()
    expect(resultWithEmptyString).toBeTruthy()

    expect(resultWithWord[0]).toBe(currentWordLastLetter)
  })

  test('word not found', () => {
    const currentWord = 'yağ'

    const result = findRandomWordFromNameList({ currentWord, NAME_LIST, appLanguage }) as string

    expect(result).toBeFalsy()
  })
})
