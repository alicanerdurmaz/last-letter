import { useGameManagerCtx, USER } from '../../context/GameManager/GameManagerContext'
import MicrophoneIcon from '../Icons/MicrophoneIcon'
import ComputerScreen from './ComputerScreen'
import UserScreen from './UserScreen'
import styles from './GameUI.module.scss'

const GameUI = () => {
  const { remainingTime, gameData } = useGameManagerCtx()
  return (
    <div className={styles.container}>
      {gameData.currentUser === USER.computer ? <ComputerScreen /> : <UserScreen />}

      <div className={styles.time}>
        <h2>{remainingTime}</h2>
      </div>

      <MicrophoneIcon enabled={false} />
    </div>
  )
}

export default GameUI
