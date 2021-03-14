import styles from 'components/GameUI/GameOver.module.scss'
import { IsGameOver, useGameManagerCtx, USER } from 'context/GameManager/GameManagerContext'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

interface IProps {
  isGameOver: IsGameOver
}

const GameOver = ({ isGameOver }: IProps) => {
  const { t } = useInternalizationCtx()
  const { gameData } = useGameManagerCtx()
  return (
    <div className={styles.container}>
      <h1 className={styles.winner}>
        {isGameOver.winner === USER.computer ? (
          <div>
            <span>😢</span> {t('computerWon')} <span>😢</span>
          </div>
        ) : (
          <div>
            <span>🥳</span> {t('userWon')} <span>🥳</span>
          </div>
        )}
      </h1>

      <div className={styles.info}>
        <p>{t(isGameOver.description)}</p>
      </div>

      <div className={styles.usedWords}>
        <h1>{t('usedWords')}</h1>

        <ul>
          {Array.from(gameData.usedWords).map(word => {
            return (
              <li key={word}>
                {word} <span>&gt; </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default GameOver
