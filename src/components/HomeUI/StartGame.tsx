import { memo } from 'react'

import Button from 'components/Button/Button'
import styles from 'components/HomeUI/StartGame.module.scss'
import { useSettingsCtx, GAME_DIFFICULTY } from 'context/GameManager/SettingsContext'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

interface IProps {
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}
const StartGame = ({ setIsGameStarted }: IProps) => {
  const { t } = useInternalizationCtx()
  const { setGameDifficulty } = useSettingsCtx()

  const onClickHandler = (gameDifficulty: number) => {
    setGameDifficulty(gameDifficulty)
    setIsGameStarted(true)
  }

  return (
    <div className={styles.container}>
      <Button color="outlined" className={styles.easy} onClick={() => onClickHandler(GAME_DIFFICULTY.easy)}>
        {t('easy')}
      </Button>
      <Button color="outlined" className={styles.normal} onClick={() => onClickHandler(GAME_DIFFICULTY.normal)}>
        {t('normal')}
      </Button>
      <Button color="outlined" className={styles.hard} onClick={() => onClickHandler(GAME_DIFFICULTY.hard)}>
        {t('hard')}
      </Button>
      <Button color="outlined" className={styles.impossible} onClick={() => onClickHandler(GAME_DIFFICULTY.impossible)}>
        {t('impossible')}
      </Button>
    </div>
  )
}

function areEqual(prevProps: IProps, nextProps: IProps) {
  return prevProps.setIsGameStarted === nextProps.setIsGameStarted
}

export default memo(StartGame, areEqual)
