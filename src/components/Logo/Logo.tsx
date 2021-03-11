import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'
import LastLetter from '../Text/LastLetter'
import styles from './Logo.module.scss'

interface IProps {
  isGameStarted: boolean
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}

const Logo = ({ setIsGameStarted, isGameStarted }: IProps) => {
  const { t } = useInternalizationCtx()

  const onClickHandler = () => {
    if (!isGameStarted) return

    if (window.confirm(t('alertForExit'))) {
      setIsGameStarted(false)
    }
  }
  return (
    <div className={styles.title} onClick={() => onClickHandler()}>
      <h1>
        <LastLetter text={t('appName')} />
      </h1>
    </div>
  )
}

export default Logo