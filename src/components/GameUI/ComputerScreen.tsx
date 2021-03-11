import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'
import styles from './GameUI.module.scss'

const ComputerScreen = () => {
  const { t } = useInternalizationCtx()
  return <h1 className={styles.computer}>{t('thinking')}...</h1>
}

export default ComputerScreen
