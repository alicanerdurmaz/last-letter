import { memo } from 'react'

import { useGameManagerCtx } from '../../context/GameManager/GameManagerContext'
import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'
import { useComputerLogic } from '../../hooks/useComputerLogic'
import LastLetter from '../Text/LastLetter'
import styles from './GameUI.module.scss'

const ComputerScreen = () => {
  const { t } = useInternalizationCtx()

  const { gameData } = useGameManagerCtx()

  const { word } = useComputerLogic()

  if (!!word) {
    return (
      <>
        <h1 className={styles.computer}>
          <span>🦾🤖 </span> {t('eureka')}
        </h1>
        <h1 className={styles.word}>
          <LastLetter text={word} />
        </h1>
      </>
    )
  }
  return (
    <>
      <h1 className={styles.computer}>
        <span>🤖 </span> {t('thinking')}...
      </h1>
      <h1 className={styles.word}>
        <LastLetter text={gameData.currentWord} />
      </h1>
    </>
  )
}

export default memo(ComputerScreen)
