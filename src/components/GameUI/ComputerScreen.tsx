import { useGameManagerCtx } from '../../context/GameManager/GameManagerContext'
import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'
import { useComputerLogic } from '../../hooks/useComputerLogic'
import LastLetter from '../Text/LastLetter'
import styles from './GameUI.module.scss'

const ComputerScreen = () => {
  const { t } = useInternalizationCtx()
  const { currentWord, usedWords, NAME_LIST, changeTurn } = useGameManagerCtx()
  useComputerLogic(currentWord, usedWords, NAME_LIST, changeTurn)

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

export default ComputerScreen
