import MicrophoneIcon from 'components/Icons/MicrophoneIcon'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

import styles from './MicPermissionDenied.module.scss'

const MicPermissionDenied = () => {
  const { t, appLanguage } = useInternalizationCtx()

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <MicrophoneIcon enabled={false} />
      </div>

      <h1 className={styles.title}>{t('micBlocked')} 😞</h1>

      <div className={styles.desc}>
        <p>{t('micBlockedDesc')}</p>
        <p>{t('howToGiveMicPermission')}</p>
      </div>

      <a
        className={styles.link}
        target="_blank"
        rel="noreferrer"
        href={`https://support.google.com/chrome/answer/2693767?hl=${appLanguage}`}
      >
        {t('howToGiveMicPermissionLink')}
      </a>
    </div>
  )
}

export default MicPermissionDenied
