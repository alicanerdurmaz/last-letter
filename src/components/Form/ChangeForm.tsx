import cx from 'classnames'

import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

import styles from './ChangeForm.module.scss'
import { FormType } from './ToggleAuthForm'

interface IProps {
  formType: FormType
  setIsAuthFormOpen: React.Dispatch<React.SetStateAction<FormType>>
}
const ChangeForm = ({ formType, setIsAuthFormOpen }: IProps) => {
  const { t } = useInternalizationCtx()
  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsAuthFormOpen(FormType.signin)}
        className={cx(styles.leftButton, formType == FormType.signin && styles.active)}
      >
        {t('signin')}
      </button>
      <button
        onClick={() => setIsAuthFormOpen(FormType.signup)}
        className={cx(styles.rightButton, formType == FormType.signup && styles.active)}
      >
        {t('signup')}
      </button>
    </div>
  )
}

export default ChangeForm
