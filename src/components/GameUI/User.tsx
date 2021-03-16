import styles from 'components/GameUI/GameUI.module.scss'
import UserMicrophone from 'components/GameUI/UserMicrophone'
import LastLetter from 'components/Text/LastLetter'
import { useGameManagerCtx } from 'context/GameManager/GameManagerContext'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

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
