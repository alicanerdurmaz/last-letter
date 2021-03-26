export function checkApiSupport() {
  const apiList = [
    ['SpeechRecognition', 'webkitSpeechRecognition'],
    ['SpeechGrammarList', 'webkitSpeechGrammarList'],
    ['SpeechSynthesisUtterance'],
  ]

  const apiIsSupported = apiList.every(e => {
    const supported = e.some((v: any) => window[v] !== undefined)

    return supported
  })

  return apiIsSupported
}
