import LastLetter from '../Text/LastLetter'
import MicrophoneIcon from '../Icons/MicrophoneIcon'

import styles from './GameUI.module.scss'
import useSpeechRecognition from '../../hooks/useSpeechRecognition'
import { memo, useEffect } from 'react'
import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'

interface IProps {
  changeTurn: () => void
}

const UserScreen = ({ changeTurn }: IProps) => {
  const { t } = useInternalizationCtx()
  const recognition = useSpeechRecognition()

  useEffect(() => {
    const currentRecognition = recognition
    currentRecognition.start()

    return () => {
      currentRecognition.stop()
    }
  }, [recognition])

  return (
    <>
      <h1 className={styles.info}>{t('gameTurnInfo')}</h1>
      <h1 className={styles.word}>
        <LastLetter text='Alican' />
      </h1>

      <MicrophoneIcon enabled={false} />
    </>
  )
}

export default memo(UserScreen)
