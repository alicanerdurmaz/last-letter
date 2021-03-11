import { memo, useEffect, useState } from 'react'
import MicrophoneIcon from '../Icons/MicrophoneIcon'

import useSpeechRecognition from '../../hooks/useSpeechRecognition'

interface IProps {
  speechRecognized: (text: string) => void
}

const UserMicrophone = ({ speechRecognized }: IProps) => {
  const [micListening, setMicListening] = useState(false)
  const recognition = useSpeechRecognition({ onMatch: speechRecognized, onStart: setMicListening })

  useEffect(() => {
    const currentRecognition = recognition
    currentRecognition.start()
    return () => {
      currentRecognition.stop()
    }
  }, [recognition])

  return <MicrophoneIcon enabled={micListening} />
}

export default memo(UserMicrophone)
