import ToggleAuthForm from 'components/Form/ToggleAuthForm'
import { useAuthContext } from 'context/Auth/AuthContext'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'
import { Routes, useRouterContext } from 'context/Router/RouterContext'
import { auth } from 'hooks/useFirebase'

import styles from './Header.module.scss'
import Logo from './Logo'

const Header = () => {
  const { t } = useInternalizationCtx()
  const { currentUser } = useAuthContext()
  const { changeRoute, getActiveRoute } = useRouterContext()

  const signOut = async () => {
    if (getActiveRoute() === Routes.game) {
      if (window.confirm(t('alertForExit'))) {
        await auth.signOut()
        changeRoute(Routes.home)
        return
      }
    }

    await auth.signOut()
  }
  return (
    <header className={styles.container}>
      <Logo />
      {currentUser ? (
        <p className={styles.welcome}>
          {t('welcome')}, {currentUser?.user?.displayName} ｜ <span onClick={signOut}>{t('signout')}</span>
        </p>
      ) : (
        <ToggleAuthForm />
      )}
    </header>
  )
}

export default Header
