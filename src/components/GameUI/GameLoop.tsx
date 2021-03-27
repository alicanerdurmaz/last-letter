import { useEffect, useState } from 'react'

import styles from 'components/GameUI/GameUI.module.scss'
import { useGameManagerCtx } from 'context/GameManager/GameManagerContext'
import { useSettingsCtx } from 'context/GameManager/SettingsContext'
import useInterval from 'hooks/useInterval'

const GameLoop = () => {
  const { turnTime } = useSettingsCtx()
  const { isGamePaused, pauseGame, gameOver, gameData } = useGameManagerCtx()
  const [remainingTime, setRemainingTime] = useState(turnTime)

  useEffect(() => {
    setRemainingTime(turnTime)
  }, [gameData.whoIsPlaying, turnTime])

  useEffect(() => {
    if (isGamePaused()) return

    if (remainingTime < 0) {
      gameOver('timesUp')
    }
  }, [pauseGame, remainingTime, gameOver, isGamePaused])

  useInterval(() => {
    if (isGamePaused()) return
    setRemainingTime(prevState => prevState - 1)
  }, 1000)

  return (
    <div className={styles.time}>
      <h1>{remainingTime}</h1>
    </div>
  )
}

export default GameLoop
