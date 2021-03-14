import { memo, useEffect } from 'react'

import { useGameManagerCtx } from '../../context/GameManager/GameManagerContext'
import useSpeechRecognition from '../../hooks/useLoadSpeechGrammar'
import MicrophoneIcon from '../Icons/MicrophoneIcon'


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
