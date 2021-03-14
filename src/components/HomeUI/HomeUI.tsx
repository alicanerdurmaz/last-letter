import styles from 'components/HomeUI/HomeUI.module.scss'
import GameDescription from 'components/Text/GameDescription'

import StartGame from './StartGame'
import TurnTimer from './TurnTimer'

interface IProps {
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}
const HomeUI = ({ setIsGameStarted }: IProps) => {
  return (
    <div className={styles.container}>
      <GameDescription />
      <StartGame setIsGameStarted={setIsGameStarted} />
      <TurnTimer />
    </div>
  )
}

export default HomeUI
