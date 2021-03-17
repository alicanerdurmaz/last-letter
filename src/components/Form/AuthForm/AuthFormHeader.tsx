import cx from 'classnames'

import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

import styles from './AuthFormHeader.module.scss'
import { FormType } from './OpenAuthForm'

interface IProps {
  formType: FormType
  setIsAuthFormOpen: React.Dispatch<React.SetStateAction<FormType>>
}
const AuthFormHeader = ({ formType, setIsAuthFormOpen }: IProps) => {
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

export default AuthFormHeader
