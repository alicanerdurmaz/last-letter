import { memo, useEffect } from 'react'
import MicrophoneIcon from '../Icons/MicrophoneIcon'

import useSpeechRecognition from '../../hooks/useSpeechRecognition'
import { useGameManagerCtx } from '../../context/GameManager/GameManagerContext'

const UserMicrophone = () => {
  const { speechRecognized } = useGameManagerCtx()
  const { recognition, listening } = useSpeechRecognition({ onResult: speechRecognized })

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
