import StartGame from 'components/HomeUI/StartGame'
import TurnTimer from 'components/HomeUI/TurnTimer'
import GameDescription from 'components/Text/GameDescription'

import styles from './Home.module.scss'

const Home = () => {
  return (
    <div className={styles.container}>
      <GameDescription />
      <StartGame />
      <TurnTimer />
    </div>
  )
}

export default Home
