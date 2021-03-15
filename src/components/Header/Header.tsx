import ToggleAuthForm from 'components/Form/ToggleAuthForm'

import styles from './Header.module.scss'
import Logo from './Logo'

interface IProps {
  isGameStarted: boolean
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({ isGameStarted, setIsGameStarted }: IProps) => {
  return (
    <header className={styles.container}>
      <Logo isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} />
      <ToggleAuthForm />
    </header>
  )
}

export default Header
