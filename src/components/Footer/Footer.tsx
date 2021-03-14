import styles from 'components/Footer/Footer.module.scss'

import SelectLanguage from './SelectLanguage'
import ShowLeaderboard from './ShowLeaderboard'
import ToggleTheme from './ToggleTheme'

interface IProps {
  isGameStarted: boolean
}
const Footer = ({ isGameStarted }: IProps) => {
  return (
    <footer className={styles.container}>
      <ToggleTheme />
      {!isGameStarted && <SelectLanguage />}
      <ShowLeaderboard />
    </footer>
  )
}

export default Footer
