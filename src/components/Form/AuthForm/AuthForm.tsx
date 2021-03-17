import { useState } from 'react'

import Button from 'components/Button/Button'
import GoogleButton from 'components/Button/GoogleButton'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'
import { auth } from 'hooks/useFirebase'

import { Form } from '../Form'
import styles from './AuthForm.module.scss'
import AuthFormHeader from './AuthFormHeader'
import { FormType } from './OpenAuthForm'

interface IProps {
  formType: FormType
  setIsAuthFormOpen: React.Dispatch<React.SetStateAction<FormType>>
}
const AuthForm = ({ formType, setIsAuthFormOpen }: IProps) => {
  const { t } = useInternalizationCtx()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  })
  const { email, password, username } = formData

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formType === FormType.signup) {
      try {
        const user = await auth.createUserWithEmailAndPassword(formData.email, formData.password)

        await user?.user?.updateProfile({
          displayName: formData.username,
        })
      } catch (error) {
        setError(t(error.code))
      }
    }

    if (formType === FormType.signin) {
      try {
        await auth.signInWithEmailAndPassword(formData.email, formData.password)
      } catch (error) {
        setError(t(error.code))
      }
    }
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  return (
    <div className={styles.container}>
      <AuthFormHeader formType={formType} setIsAuthFormOpen={setIsAuthFormOpen} />
      <Form onSubmit={handleSubmit}>
        <Form.FormControl
          hidden={formType === FormType.signin}
          autoFocus={true}
          type="text"
          name="username"
          label={t('username')}
          onChange={e => onChangeHandler(e)}
          value={username}
        />
        <Form.FormControl
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

        <Button type="submit">{formType === FormType.signin ? t('signin') : t('signup')}</Button>
      </Form>
      <GoogleButton />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default AuthForm
