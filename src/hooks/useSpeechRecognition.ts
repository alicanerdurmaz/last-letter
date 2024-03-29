import { useRef, useState } from 'react'

import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

// any vencdor-specific api are not adding to typescript.
// i used this solution
// https://github.com/microsoft/TypeScript/issues/42311
const myWindow = window as any

const SpeechRecognition = window.SpeechRecognition || myWindow.webkitSpeechRecognition

interface IProps {
  onResult: (word: string) => void
}
const useSpeechRecognition = ({ onResult }: IProps) => {
  const { appLanguage } = useInternalizationCtx()
  const [listening, setListening] = useState(false)

  const recognition = useRef(new SpeechRecognition())

  recognition.current.continuous = true
  recognition.current.lang = appLanguage
  recognition.current.interimResults = false
  recognition.current.maxAlternatives = 1

  recognition.current.onresult = event => {
    setListening(false)
    onResult(event.results[0][0].transcript)
  }

  recognition.current.onspeechstart = () => {
    setListening(true)
  }

  recognition.current.onspeechend = () => {
    recognition.current.stop()
  }

  recognition.current.onnomatch = () => {
    recognition.current.stop()
  }

  return { recognition, listening }
}

export default useSpeechRecognition
