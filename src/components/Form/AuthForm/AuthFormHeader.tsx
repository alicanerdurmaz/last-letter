import cx from 'classnames'

import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

import { FormType } from './AuthForm'
import styles from './AuthFormHeader.module.scss'

interface IProps {
  formType: FormType
  setFormType: React.Dispatch<React.SetStateAction<FormType>>
}
const AuthFormHeader = ({ formType, setFormType }: IProps) => {
  const { t } = useInternalizationCtx()
  return (
    <div className={styles.container}>
      <button
        onClick={() => setFormType(FormType.signin)}
        className={cx(styles.leftButton, formType == FormType.signin && styles.active)}
      >
        {t('signin')}
      </button>
      <button
        onClick={() => setFormType(FormType.signup)}
        className={cx(styles.rightButton, formType == FormType.signup && styles.active)}
      >
        {t('signup')}
      </button>
    </div>
  )
}

export default AuthFormHeader
