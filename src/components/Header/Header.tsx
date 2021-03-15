import ToggleAuthForm from 'components/Form/ToggleAuthForm'
import { useAuthContext } from 'context/Auth/AuthContext'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'
import { auth } from 'hooks/useFirebase'

import styles from './Header.module.scss'
import Logo from './Logo'

interface IProps {
  isGameStarted: boolean
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ isGameStarted, setIsGameStarted }: IProps) => {
  const { t } = useInternalizationCtx()
  const { currentUser } = useAuthContext()

  const signOut = async () => {
    if (isGameStarted) {
      if (window.confirm(t('alertForExit'))) {
        setIsGameStarted(false)
        await auth.signOut()
      }
    }
  }
  return (
    <header className={styles.container}>
      <Logo isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} />
      {currentUser ? (
        <p className={styles.welcome}>
          {t('welcome')}, {currentUser.displayName} ｜ <span onClick={signOut}>{t('signout')}</span>
        </p>
      ) : (
        <ToggleAuthForm />
      )}
    </header>
  )
}

export default Header
