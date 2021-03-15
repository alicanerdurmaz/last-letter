import { memo, useEffect } from 'react'

import MicrophoneIcon from 'components/Icons/MicrophoneIcon'
import { useGameManagerCtx } from 'context/GameManager/GameManagerContext'
import useSpeechRecognition from 'hooks/useSpeechRecognition'

const UserMicrophone = () => {
  const { speechRecognized } = useGameManagerCtx()
  const { recognition, listening } = useSpeechRecognition({ onResult: speechRecognized })

  useEffect(() => {
    const currentRecognition = recognition.current

    currentRecognition.start()
    return () => {
      currentRecognition.stop()
      currentRecognition.abort()
    }
  }, [recognition])

  return <MicrophoneIcon enabled={listening} />
}

export default memo(UserMicrophone)
