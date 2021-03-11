import { useState } from 'react'

import styles from './Button.module.scss'

const RoundTimer = () => {
  const [roundTime, setRoundTime] = useState(8)

  return (
    <div className={styles.roundTimer}>
      <label htmlFor='volume'>
        Round Time : <span>{roundTime} second</span>
      </label>
      <input
        type='range'
        id='time'
        name='time'
        min='0'
        max='20'
        value={roundTime}
        onChange={(e) => setRoundTime(parseInt(e.target.value))}
      />
    </div>
  )
}

export default RoundTimer
