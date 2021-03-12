import { memo } from 'react'
import { useGameManagerCtx } from '../../context/GameManager/GameManagerContext'
import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'
import LastLetter from '../Text/LastLetter'
import styles from './GameUI.module.scss'

const ComputerScreen = () => {
  const { t } = useInternalizationCtx()
  const { currentWord } = useGameManagerCtx()
  // useComputerLogic(currentWord, usedWords, NAME_LIST, changeTurn)

  console.log('computer screen worked')

  return (
    <div>
      <h1 className={styles.computer}>
        <span>🤖</span> {t('thinking')}...
      </h1>
      <h1 className={styles.word}>
        <LastLetter text={currentWord} />
      </h1>
    </div>
  )
}

export default memo(ComputerScreen)
