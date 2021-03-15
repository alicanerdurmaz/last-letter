import MicrophoneIcon from 'components/Icons/MicrophoneIcon'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

import styles from './MicPermissionDenied.module.scss'

const MicPermissionDenied = () => {
  const { t } = useInternalizationCtx()
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <MicrophoneIcon enabled={false} />
      </div>

      <h1 className={styles.title}>{t('mickBlocked')} 😞</h1>

      <div className={styles.desc}>
        <p>{t('micBlockedDesc')}</p>
        <p>{t('howToGiveMicPermission')}</p>
      </div>

      <a
        className={styles.link}
        target="_blank"
        href="https://support.google.com/chrome/answer/2693767?co=GENIE.Platform%3DDesktop&hl=tr#zippy="
      >
        {t('howToGiveMicPermissionLink')}
      </a>
    </div>
  )
}

export default MicPermissionDenied
