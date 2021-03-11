import { useGameManagerCtx, USER } from '../../context/GameManager/GameManagerContext'

import ComputerScreen from './ComputerScreen'
import UserScreen from './UserScreen'
import styles from './GameUI.module.scss'

const GameUI = () => {
  const { remainingTime, gameData, changeTurn } = useGameManagerCtx()

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <h2>{remainingTime}</h2>
      </div>

      {gameData.currentUser === USER.computer ? <ComputerScreen /> : <UserScreen changeTurn={changeTurn} />}
    </div>
  )
}

export default GameUI
