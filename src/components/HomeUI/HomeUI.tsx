import styles from 'components/HomeUI/HomeUI.module.scss'
import GameDescription from 'components/Text/GameDescription'

import StartGame from './StartGame'
import TurnTimer from './TurnTimer'

const HomeUI = () => {
  return (
    <div className={styles.container}>
      <GameDescription />
      <StartGame />
      <TurnTimer />
    </div>
  )
}

export default HomeUI
