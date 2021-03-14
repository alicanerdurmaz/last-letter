import NAME_LIST from 'data/names.json'
import { findRandomWordFromNameList } from 'utils/findRandomWordFromNameList'

describe('find a word from list that begins with the last letter of the given word', () => {
  test('word found', () => {
    const currentWord = 'test'
    const currentWordLastLetter = currentWord[currentWord.length - 1]

    const resultWithWord = findRandomWordFromNameList(currentWord, NAME_LIST) as string
    const resultWithEmptyString = findRandomWordFromNameList('', NAME_LIST) as string

    expect(resultWithWord).toBeTruthy()
    expect(resultWithEmptyString).toBeTruthy()

    expect(resultWithWord[0]).toBe(currentWordLastLetter)
  })

  test('word not found', () => {
    const currentWord = 'yağ'

    const result = findRandomWordFromNameList(currentWord, NAME_LIST) as string

    expect(result).toBeFalsy()
  })
})
