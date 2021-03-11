import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'
import styles from './Button.module.scss'

const SelectLanguage = () => {
  const { t, changeAppLanguage, appLanguage } = useInternalizationCtx()

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeAppLanguage(e.target.value)
  }

  return (
    <div className={styles.selectContainer}>
      <select name='languages' onChange={(e) => selectHandler(e)} defaultValue={appLanguage}>
        <option value='tr'>{t('turkish')}</option>
        <option value='en'>{t('english')}</option>
      </select>
    </div>
  )
}

export default SelectLanguage
