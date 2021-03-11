import { useState } from 'react'
import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'

import styles from './Button.module.scss'

const RoundTimer = () => {
  const { t } = useInternalizationCtx()
  const [roundTime, setRoundTime] = useState(8)

  return (
    <div className={styles.roundTimer}>
      <label htmlFor='volume'>
        {t('roundTime')} :{' '}
        <span>
          {roundTime} {t('second')}
        </span>
      </label>
      <input
        type='range'
        id='time'
        name='time'
        min='4'
        max='20'
        value={roundTime}
        onChange={(e) => setRoundTime(parseInt(e.target.value))}
      />
    </div>
  )
}

export default RoundTimer
