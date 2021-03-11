import { memo } from 'react'
import { useSettingsCtx, GAME_DIFFICULTY } from '../../context/GameManager/SettingsContext'
import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'
import Button from '../Button/Button'

import styles from './StartGame.module.scss'

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
      <Button color='primary' onClick={() => onClickHandler(GAME_DIFFICULTY.easy)}>
        {t('easy')}
      </Button>
      <Button color='warning' onClick={() => onClickHandler(GAME_DIFFICULTY.normal)}>
        {t('normal')}
      </Button>
      <Button color='error' onClick={() => onClickHandler(GAME_DIFFICULTY.hard)}>
        {t('hard')}
      </Button>
    </div>
  )
}

function areEqual(prevProps: IProps, nextProps: IProps) {
  return prevProps.setIsGameStarted === nextProps.setIsGameStarted
}

export default memo(StartGame, areEqual)
