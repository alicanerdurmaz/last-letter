import { useEffect } from 'react'

import grammerList from '../data/grammerList.json'

const useLoadSpeechGrammar = () => {
  useEffect(() => {
    const myWindow = window as any

    const SpeechGrammarList = window.SpeechGrammarList || myWindow.webkitSpeechGrammarList

    if (!SpeechGrammarList) return

    const speechRecognitionList = new SpeechGrammarList()

    if (SpeechGrammarList.length < 1) speechRecognitionList.addFromString(grammerList.grammerList, 1)
  }, [])
}

export default useLoadSpeechGrammar
