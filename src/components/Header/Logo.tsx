import LastLetter from 'components/Text/LastLetter'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'
import { Routes, useRouterContext } from 'context/Router/RouterContext'

import styles from './Logo.module.scss'

const Logo = () => {
  const { t } = useInternalizationCtx()
  const { changeRoute, getActiveRoute } = useRouterContext()

  const onClickHandler = () => {
    if (getActiveRoute() === Routes.home) return

    if (window.confirm(t('alertForExit'))) {
      changeRoute(Routes.home)
    }
  }
  return (
    <div className={styles.logo} onClick={() => onClickHandler()}>
      <h1>
        <LastLetter text={t('appName')} />
      </h1>
    </div>
  )
}

export default Logo
