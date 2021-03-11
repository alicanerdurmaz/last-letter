import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'

import LastLetter from '../Text/LastLetter'
import styles from './Logo.module.scss'

const Logo = () => {
  const { t } = useInternalizationCtx()

  return (
    <div className={styles.title}>
      <h1>
        <LastLetter text={t('appName')} />
      </h1>
    </div>
  )
}

export default Logo
