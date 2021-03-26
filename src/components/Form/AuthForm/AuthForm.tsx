import { useState } from 'react'

import GoogleButton from 'components/Button/GoogleButton'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'services/firebase'

import Form from '../Form'
import styles from './AuthForm.module.scss'
import AuthFormHeader from './AuthFormHeader'

export type FormType = typeof FormTypeEnum.closed | typeof FormTypeEnum.signin | typeof FormTypeEnum.signup

export const FormTypeEnum = {
  closed: false,
  signin: 1,
  signup: 2,
}
interface IProps {
  type: FormType
}
const AuthForm = ({ type }: IProps) => {
  const { t } = useInternalizationCtx()
  const [formType, setFormType] = useState<FormType>(type)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  })
  const { email, password, username } = formData

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formType === FormTypeEnum.closed || loading) return

    setLoading(true)

    const error = await (formType === FormTypeEnum.signin
      ? signInWithEmailAndPassword({ email, password, username })
      : createUserWithEmailAndPassword({ email, password }))

    if (error) {
      setError(error)
      setLoading(false)
    }
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setFormData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  return (
    <div className={styles.container}>
      <AuthFormHeader formType={formType} setFormType={setFormType} />

      <Form onSubmit={handleSubmit} disabled={loading}>
        <Form.FormControl
          hidden={formType === FormTypeEnum.signin}
          autoFocus={true}
          type="text"
          name="username"
          label={t('username')}
          onChange={e => onChangeHandler(e)}
          value={username}
        />
        <Form.FormControl
          autoFocus={true}
          type="email"
          name="email"
          label={t('email')}
          onChange={e => onChangeHandler(e)}
          value={email}
        />
        <Form.FormControl
          minLength={6}
          type="password"
          name="password"
          label={t('password')}
          onChange={e => onChangeHandler(e)}
          value={password}
        />

        <Form.SubmitButton loading={loading}>
          {formType === FormTypeEnum.signin ? t('signin') : t('signup')}
        </Form.SubmitButton>
      </Form>

      <GoogleButton disabled={loading} />
      {error && <p className={styles.error}>{t(error)}</p>}
    </div>
  )
}

export default AuthForm
