import styles from 'components/Footer/SelectLanguage.module.scss'
import { useSettingsCtx } from 'context/GameManager/SettingsContext'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

const SelectLanguage = () => {
  const { t } = useInternalizationCtx()
  const { appLanguage, changeAppLanguage } = useSettingsCtx()

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeAppLanguage(e.target.value)
  }

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
