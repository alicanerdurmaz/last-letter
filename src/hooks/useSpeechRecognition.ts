import { useRef, useState } from 'react'
import grammerList from '../data/grammerList.json'

// any vencdor-specific api are not adding to typescript.
// i used this solution
// https://github.com/microsoft/TypeScript/issues/42311
const myWindow = window as any
const SpeechGrammarList = window.SpeechGrammarList || myWindow.webkitSpeechGrammarList
const speechRecognitionList = new SpeechGrammarList()
speechRecognitionList.addFromString(grammerList.grammerList, 1)

const SpeechRecognition = window.SpeechRecognition || myWindow.webkitSpeechRecognition

const useSpeechRecognition = () => {
  const [speechResult, setSpeechResult] = useState('')
  const [listening, setListening] = useState(false)
  const [error, setError] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  const recognition = useRef(new SpeechRecognition())

  recognition.current.continuous = true
  recognition.current.lang = localStorage.getItem('lang') || 'tr-TR'
  recognition.current.interimResults = false
  recognition.current.maxAlternatives = 1

  recognition.current.onresult = (event) => {
    setListening(false)
    setSpeechResult(event.results[0][0].transcript)
  }
  recognition.current.onspeechstart = () => {
    setListening(true)
    console.warn('ON SPEECH START')
  }

  recognition.current.onstart = () => {
    console.warn('ON START')
  }

  recognition.current.onspeechend = () => {
    recognition.current.stop()
    console.warn('ON SPEECH END')
  }

  recognition.current.onnomatch = () => {
    setNoMatch(true)
    recognition.current.stop()
  }

  recognition.current.onerror = (event) => {
    setError(true)
  }

  return { recognition, listening, speechResult, error, noMatch }
}

export default useSpeechRecognition
