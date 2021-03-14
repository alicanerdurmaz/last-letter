import styles from './Footer.module.scss'
import SelectLanguage from './SelectLanguage'
import ToggleTheme from './ToggleTheme'

interface IProps {
  isGameStarted: boolean
}
const Footer = ({ isGameStarted }: IProps) => {
  return (
    <footer className={styles.container}>
      <ToggleTheme />
      {!isGameStarted && <SelectLanguage />}
    </footer>
  )
}

export default Footer
