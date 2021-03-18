import NAME_LIST from 'data/turkish-names.json'
import { checkWordIsInvalid } from 'utils/checkWordIsInvalid'

describe('find a word from list that begins with the last letter of the given word', () => {
  const usedWords = new Set<string>([])

  test('last char not e qual to first char', () => {
    const newWord = 'melisa'
    const currentWord = 'alican'

    const result = checkWordIsInvalid({ NAME_LIST, newWord, currentWord, usedWords, appLanguage: 'tr-TR' })
    expect(result).toBe('lastCharNotEqualToFirstChar')
  })

  test('bad language', () => {
    const newWord = '***'
    const currentWord = 'a'

    const result = checkWordIsInvalid({ NAME_LIST, newWord, currentWord, usedWords, appLanguage: 'tr-TR' })
    expect(result).toBe('badLanguage')
  })

  test('used before', () => {
    usedWords.add('esra')
    const newWord = 'esra'
    const currentWord = 'emre'

    const result = checkWordIsInvalid({ NAME_LIST, newWord, currentWord, usedWords, appLanguage: 'tr-TR' })
    expect(result).toBe('usedBefore')
  })

  test('not a name', () => {
    const newWord = 'a'
    const currentWord = 'a'

    const result = checkWordIsInvalid({ NAME_LIST, newWord, currentWord, usedWords, appLanguage: 'tr-TR' })
    expect(result).toBe('notAName')
  })

  test('word is valid', () => {
    const newWord = 'alican'
    const currentWord = 'arda'

    const result = checkWordIsInvalid({ NAME_LIST, newWord, currentWord, usedWords, appLanguage: 'tr-TR' })
    expect(result).toBeFalsy()
  })
})
