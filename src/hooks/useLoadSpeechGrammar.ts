import { useEffect } from 'react'

import englishGrammerList from 'data/english-grammerList.json'
import turkishGrammerList from 'data/turkish-grammerList.json'

const useLoadSpeechGrammar = () => {
  useEffect(() => {
    const myWindow = window as any

    const SpeechGrammarList = window.SpeechGrammarList || myWindow.webkitSpeechGrammarList

    if (!SpeechGrammarList) return

    const speechRecognitionList = new SpeechGrammarList()

    if (SpeechGrammarList.length < 2) {
      speechRecognitionList.addFromString(turkishGrammerList.grammerList, 1)
      speechRecognitionList.addFromString(englishGrammerList.grammerList, 1)
    }
  }, [])
}

export default useLoadSpeechGrammar
