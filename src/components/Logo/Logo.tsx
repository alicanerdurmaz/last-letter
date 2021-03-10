import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'
import styles from './Logo.module.scss'

const Logo = () => {
  const { t } = useInternalizationCtx()
  return <h1 className={styles.title}>{t('appName')}</h1>
}

export default Logo
