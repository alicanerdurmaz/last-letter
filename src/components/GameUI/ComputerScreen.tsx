import { memo } from 'react'

import styles from 'components/GameUI/GameUI.module.scss'
import LastLetter from 'components/Text/LastLetter'
import { useGameManagerCtx } from 'context/GameManager/GameManagerContext'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'
import { useComputerLogic } from 'hooks/useComputerLogic'

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
