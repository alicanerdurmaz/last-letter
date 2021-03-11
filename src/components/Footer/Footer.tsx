import SelectLanguage from '../Button/SelectLanguage'
import ToggleTheme from '../Button/ToggleTheme'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <ToggleTheme />
      <SelectLanguage />
    </footer>
  )
}

export default Footer
