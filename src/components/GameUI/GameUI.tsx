import styles from './GameUI.module.scss'

const GameUI: React.FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default GameUI
