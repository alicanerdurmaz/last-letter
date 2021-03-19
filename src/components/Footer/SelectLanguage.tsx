import styles from 'components/Footer/SelectLanguage.module.scss'
import { AppLangugage, useInternalizationCtx } from 'context/Internalization/InternalizationContext'
import { Routes, useRouterContext } from 'context/Router/RouterContext'

const SelectLanguage = () => {
  const { getActiveRoute } = useRouterContext()
  const { t } = useInternalizationCtx()
  const { appLanguage, setAppLanguage } = useInternalizationCtx()

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value
    setAppLanguage(selectedLanguage as AppLangugage)
    localStorage.setItem('lang', selectedLanguage)
  }

  if (getActiveRoute() === Routes.game) return null

  return (
    <div className={styles.container}>
      <select name="languages" onChange={e => selectHandler(e)} defaultValue={appLanguage}>
        <option value="tr-TR">{t('turkish')}</option>
        <option value="en-US">{t('english')}</option>
      </select>
    </div>
  )
}

export default SelectLanguage
