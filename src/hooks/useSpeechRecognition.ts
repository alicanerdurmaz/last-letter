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

interface IProps {
  onMatch: (text: string) => void
  onStart: (started: boolean) => void
}
const useSpeechRecognition = ({ onMatch, onStart }: IProps) => {
  recognition.continuous = true
  recognition.lang = localStorage.getItem('lang') || 'tr-TR'
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  recognition.onresult = (event) => {
    onMatch(event.results[0][0].transcript)
    recognition.stop()
  }

  recognition.onspeechstart = () => {
    onStart(true)
    console.log('speech recognition -> onspeechstart')
  }

  recognition.onstart = () => {
    console.log('speech recognition -> onstart')
  }

  recognition.onspeechend = () => {
    recognition.stop()
    console.log('speech recognition -> onspeechend')
  }

  recognition.onnomatch = (event) => {
    console.log('speech recognition -> on no match')
    recognition.stop()
  }

  recognition.onerror = (event) => {
    console.log('Error occurred in recognition', event.error)
  }

  return recognition
}

export default useSpeechRecognition
