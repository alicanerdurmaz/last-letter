import { useGameManagerCtx } from '../../context/GameManager/GameManagerContext'
import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'
import LastLetter from '../Text/LastLetter'
import styles from './GameUI.module.scss'
import UserMicrophone from './UserMicrophone'


const UserScreen = () => {
  const { t } = useInternalizationCtx()
  const { gameData } = useGameManagerCtx()

  return (
    <>
      <h1 className={styles.info}>{t('gameTurnInfo')}</h1>
      <h1 className={styles.word}>
        <LastLetter text={gameData.currentWord} />
      </h1>
      <UserMicrophone />
    </>
  )
}

export default UserScreen
