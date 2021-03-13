export function checkApiSupport() {
  const apiList = [
    ['SpeechRecognition', 'webkitSpeechRecognition'],
    ['SpeechGrammarList', 'webkitSpeechGrammarList'],
    ['SpeechSynthesisUtterance'],
  ]
  const undefinedApiList: string[][] = []

  apiList.forEach(e => {
    let supported = false
    e.forEach((v: any) => {
      if (window[v] !== undefined) {
        supported = true
      }
    })
    if (!supported) {
      undefinedApiList.push(e)
    }
  })
  if (undefinedApiList.length >= 1) {
    return false
  }
  return true
}
