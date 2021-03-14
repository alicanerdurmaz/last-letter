import styles from 'components/HomeUI/TurnTimer.module.scss'
import { useSettingsCtx } from 'context/GameManager/SettingsContext'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

const TurnTimer = () => {
  const { t } = useInternalizationCtx()
  const { turnTime, setTurnTime } = useSettingsCtx()

  return (
    <div className={styles.container}>
      <label htmlFor="volume">
        {t('turnTime')} :{' '}
        <span>
          {turnTime} {t('second')}
        </span>
      </label>
      <input
        type="range"
        id="time"
        name="time"
        min="4"
        max="20"
        value={turnTime}
        onChange={e => setTurnTime(parseInt(e.target.value))}
      />
    </div>
  )
}

export default TurnTimer
