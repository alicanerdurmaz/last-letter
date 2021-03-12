import { memo, useEffect } from 'react'
import MicrophoneIcon from '../Icons/MicrophoneIcon'

import useSpeechRecognition from '../../hooks/useSpeechRecognition'

const UserMicrophone = () => {
  const { recognition, listening } = useSpeechRecognition()

  useEffect(() => {
    const currentRecognition = recognition.current

    currentRecognition.start()
    return () => {
      currentRecognition.stop()
    }
  }, [recognition])

  return <MicrophoneIcon enabled={listening} />
}

export default memo(UserMicrophone)
