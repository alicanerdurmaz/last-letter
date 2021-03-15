import ComputerScreen from 'components/GameUI/ComputerScreen'
import styles from 'components/GameUI/GameUI.module.scss'
import UserScreen from 'components/GameUI/UserScreen'
import { useGameLoopCtx } from 'context/GameManager/GameLoop'
import { useGameManagerCtx, USER } from 'context/GameManager/GameManagerContext'

const GameUI = () => {
  const { gameData } = useGameManagerCtx()
  const { remainingTime } = useGameLoopCtx()

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <h1>{remainingTime}</h1>
      </div>
      {gameData.whoIsPlaying === USER.computer ? <ComputerScreen /> : <UserScreen />}
    </div>
  )
}

export default GameUI
