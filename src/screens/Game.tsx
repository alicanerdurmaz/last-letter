import Computer from 'components/GameUI/Computer'
import GameLoop from 'components/GameUI/GameLoop'
import User from 'components/GameUI/User'
import { useGameManagerCtx, USER } from 'context/GameManager/GameManagerContext'

import styles from './Game.module.scss'

const Game = () => {
  const { gameData } = useGameManagerCtx()
  return (
    <div className={styles.container}>
      <GameLoop />
      <div className={styles.playerContainer}>{gameData.whoIsPlaying === USER.computer ? <Computer /> : <User />}</div>
    </div>
  )
}

export default Game
