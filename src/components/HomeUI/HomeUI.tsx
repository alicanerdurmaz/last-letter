import GameDescription from '../Text/GameDescription'
import styles from './HomeUI.module.scss'
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
