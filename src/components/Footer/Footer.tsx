import styles from 'components/Footer/Footer.module.scss'

import SelectLanguage from './SelectLanguage'
import ShowLeaderboard from './ShowLeaderboard'
import ToggleTheme from './ToggleTheme'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <ToggleTheme />
      <SelectLanguage />
      <ShowLeaderboard />
    </footer>
  )
}

export default Footer
