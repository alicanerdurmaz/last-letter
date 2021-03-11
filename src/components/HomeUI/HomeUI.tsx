import GameDescription from '../Text/GameDescription'
import styles from './HomeUI.module.scss'
import TurnTimer from './TurnTimer'
import StartGame from './StartGame'

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
