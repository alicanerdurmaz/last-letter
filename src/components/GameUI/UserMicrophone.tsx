import MicrophoneIcon from '../Icons/MicrophoneIcon'

import useSpeechRecognition from '../../hooks/useSpeechRecognition'
import { memo, useEffect } from 'react'

interface IProps {
  speechRecognized: (text: string) => void
}

const UserMicrophone = ({ speechRecognized }: IProps) => {
  const recognition = useSpeechRecognition({ onMatch: speechRecognized })

  useEffect(() => {
    const currentRecognition = recognition
    currentRecognition.start()
    return () => {
      currentRecognition.stop()
    }
  }, [recognition])

  return <MicrophoneIcon enabled={false} />
}

export default memo(UserMicrophone)
