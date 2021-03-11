import { useGameManagerCtx, USER } from '../../context/GameManager/GameManagerContext'

import ComputerScreen from './ComputerScreen'
import UserScreen from './UserScreen'
import styles from './GameUI.module.scss'
import React from 'react'

const GameUI = () => {
  const { remainingTime, whoIsPlaying } = useGameManagerCtx()

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <h2>{remainingTime}</h2>
      </div>

      {whoIsPlaying === USER.computer ? <ComputerScreen /> : <UserScreen />}
    </div>
  )
}

export default GameUI
