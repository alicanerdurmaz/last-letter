import { useGameManagerCtx } from '../../context/GameManager/GameManagerContext'
import LastLetter from '../Text/LastLetter'
import UserMicrophone from './UserMicrophone'

import styles from './GameUI.module.scss'
import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'

const UserScreen = () => {
  const { t } = useInternalizationCtx()
  const { currentWord } = useGameManagerCtx()

  return (
    <>
      <h1 className={styles.info}>{t('gameTurnInfo')}</h1>
      <h1 className={styles.word}>
        <LastLetter text={currentWord} />
      </h1>
      {/* <UserMicrophone /> */}
    </>
  )
}

export default UserScreen
