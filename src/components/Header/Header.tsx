import OpenAuthForm from 'components/Form/AuthForm/OpenAuthForm'

import styles from './Header.module.scss'
import Logo from './Logo'

const Header = () => {
  return (
    <header className={styles.container}>
      <Logo />
      <OpenAuthForm />
    </header>
  )
}

export default Header
