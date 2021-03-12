import { memo, useEffect } from 'react'
import MicrophoneIcon from '../Icons/MicrophoneIcon'

import useSpeechRecognition from '../../hooks/useSpeechRecognition'

interface IProps {
  speechRecognized: (word: string) => void
}

const UserMicrophone = ({ speechRecognized }: IProps) => {
  const { recognition, listening, speechResult } = useSpeechRecognition()

  useEffect(() => {
    const currentRecognition = recognition.current

    currentRecognition.start()
    return () => {
      currentRecognition.stop()
    }
  }, [recognition])

  useEffect(() => {
    speechRecognized(speechResult)
  }, [speechResult, speechRecognized])

  return <MicrophoneIcon enabled={listening} />
}

export default memo(UserMicrophone)
