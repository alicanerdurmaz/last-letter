import ComputerScreen from './ComputerScreen'
import UserScreen from './UserScreen'
import styles from './GameUI.module.scss'
import React from 'react'
import { useGameLoopCtx } from '../../context/GameManager/GameLoop'
import { useGameManagerCtx, USER } from '../../context/GameManager/GameManagerContext'
import GameOver from './GameOver'

const GameUI = () => {
  const { whoIsPlaying, isGameOver } = useGameManagerCtx()
  const { remainingTime } = useGameLoopCtx()

  if (isGameOver) {
    return <GameOver isGameOver={isGameOver} />
  }
  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <h1>{remainingTime}</h1>
      </div>
      {whoIsPlaying === USER.computer ? <ComputerScreen /> : <UserScreen />}
    </div>
  )
}

export default GameUI
