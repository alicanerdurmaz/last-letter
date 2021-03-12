import { memo, useEffect, useState } from 'react'
import MicrophoneIcon from '../Icons/MicrophoneIcon'

import useSpeechRecognition from '../../hooks/useSpeechRecognition'

interface IProps {
  speechRecognized: (word: string) => void
}

const UserMicrophone = ({ speechRecognized }: IProps) => {
  const [micListening, setMicListening] = useState(false)
  const recognition = useSpeechRecognition({ onMatch: speechRecognized, toggleMicAnimation: setMicListening })

  useEffect(() => {
    const currentRecognition = recognition.current

    currentRecognition.start()
    return () => {
      currentRecognition.stop()
    }
  }, [recognition])

  return <MicrophoneIcon enabled={micListening} />
}

export default memo(UserMicrophone)
