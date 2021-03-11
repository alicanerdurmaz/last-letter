import SelectLanguage from '../Button/SelectLanguage'
import ToggleTheme from '../Button/ToggleTheme'
import styles from './Footer.module.scss'

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
