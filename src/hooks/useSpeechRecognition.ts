import { useRef, useEffect } from 'react'

import grammerList from '../data/grammerList.json'

// any vencdor-specific api are not adding to typescript.
// i used this solution
// https://github.com/microsoft/TypeScript/issues/42311
const myWindow = window as any

const SpeechRecognition = window.SpeechRecognition || myWindow.webkitSpeechRecognition
const SpeechGrammarList = window.SpeechGrammarList || myWindow.webkitSpeechGrammarList

const recognition = new SpeechRecognition()
const speechRecognitionList = new SpeechGrammarList()

speechRecognitionList.addFromString(grammerList.grammerList, 1)

const useSpeechRecognition = () => {
  console.time('speech init')

  recognition.continuous = true
  recognition.lang = localStorage.getItem('lang') || 'en-US'
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  recognition.onresult = (event) => {
    recognition.stop()
    console.log(event.results[0][0].transcript)
  }

  recognition.onspeechend = function () {
    console.log('speech recognition -> end')
    recognition.stop()
  }

  recognition.onnomatch = function (event) {
    console.log('speech recognition -> didnt recognise that name.')
  }

  recognition.onerror = function (event) {
    console.log('Error occurred in recognition', event.error)
  }

  console.timeEnd('speech init')
  return recognition
}

export default useSpeechRecognition
