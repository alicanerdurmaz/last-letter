import { useRef } from 'react'
import grammerList from '../data/grammerList.json'

// any vencdor-specific api are not adding to typescript.
// i used this solution
// https://github.com/microsoft/TypeScript/issues/42311
const myWindow = window as any

const SpeechRecognition = window.SpeechRecognition || myWindow.webkitSpeechRecognition
const SpeechGrammarList = window.SpeechGrammarList || myWindow.webkitSpeechGrammarList

const speechRecognitionList = new SpeechGrammarList()
speechRecognitionList.addFromString(grammerList.grammerList, 1)
interface IProps {
  onMatch: (word: string) => void
  toggleMicAnimation: (started: boolean) => void
}

const useSpeechRecognition = ({ onMatch, toggleMicAnimation }: IProps) => {
  const recognition = useRef(new SpeechRecognition())

  recognition.current.continuous = true
  recognition.current.lang = localStorage.getItem('lang') || 'tr-TR'
  recognition.current.interimResults = false
  recognition.current.maxAlternatives = 1

  recognition.current.onresult = (event) => {
    onMatch(event.results[0][0].transcript)
  }

  recognition.current.onspeechstart = () => {
    toggleMicAnimation(true)
    console.warn('ON SPEECH START')
  }

  recognition.current.onstart = () => {
    console.warn('ON START')
  }

  recognition.current.onspeechend = () => {
    recognition.current.stop()
    console.warn('ON SPEECH END')
  }

  recognition.current.onnomatch = (event) => {
    console.warn('ON NO MATCH')
    recognition.current.stop()
  }

  recognition.current.onerror = (event) => {
    console.error('ON ERROR', event.error)
    toggleMicAnimation(false)
  }

  return recognition
}

export default useSpeechRecognition
