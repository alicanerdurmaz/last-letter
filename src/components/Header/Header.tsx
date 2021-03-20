import OpenAuthForm from 'components/Form/AuthForm/OpenAuthForm'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

import styles from './Header.module.scss'
import Logo from './Logo'

const Header = () => {
  const { t } = useInternalizationCtx()

  return (
    <header className={styles.container}>
      <Logo />
      <OpenAuthForm />
    </header>
  )
}

export default Header
