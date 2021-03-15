import Button from 'components/Button/Button'
import styles from 'components/HomeUI/StartGame.module.scss'
import { useSettingsCtx, GAME_DIFFICULTY } from 'context/GameManager/SettingsContext'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'
import { Routes, useRouterContext } from 'context/Router/RouterContext'
import { askPermission, checkMicPermission } from 'utils/checkMicPermission'

const StartGame = () => {
  const { changeRoute } = useRouterContext()
  const { t } = useInternalizationCtx()
  const { setGameDifficulty } = useSettingsCtx()

  const onClickHandler = async (gameDifficulty: number) => {
    if ((await checkMicPermission()) === 'granted') {
      startGame(gameDifficulty)
      return
    }

    if (await askPermission()) {
      startGame(gameDifficulty)
      return
    }

    changeRoute(Routes.MicPermissionDenied)
  }

  const startGame = (gameDifficulty: number) => {
    setGameDifficulty(gameDifficulty)
    changeRoute(Routes.game)
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

export default StartGame
