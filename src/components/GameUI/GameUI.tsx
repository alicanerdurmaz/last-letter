import ComputerScreen from 'components/GameUI/ComputerScreen'
import GameOver from 'components/GameUI/GameOver'
import styles from 'components/GameUI/GameUI.module.scss'
import UserScreen from 'components/GameUI/UserScreen'
import { useGameLoopCtx } from 'context/GameManager/GameLoop'
import { useGameManagerCtx, USER } from 'context/GameManager/GameManagerContext'

const GameUI = () => {
  const { gameData, isGameOver } = useGameManagerCtx()
  const { remainingTime } = useGameLoopCtx()

  if (isGameOver) {
    return <GameOver isGameOver={isGameOver} />
  }
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
