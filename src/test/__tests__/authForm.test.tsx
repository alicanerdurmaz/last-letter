import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import AuthForm, { FormType } from 'components/Form/AuthForm/AuthForm'
import { SettingsProvider } from 'context/GameManager/SettingsContext'
import { InternalizationProvider } from 'context/Internalization/InternalizationContext'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'services/firebase'
import { getLanguageFromLocalStorage } from 'utils/getLanguageFromLocalStorage'

jest.mock('utils/getLanguageFromLocalStorage')
jest.mock('services/firebase')

beforeEach(() => {
  ;(getLanguageFromLocalStorage as jest.Mock).mockReturnValueOnce('en-US')
})

describe('auth form', () => {
  test('type sign in', () => {
    const { getByTestId } = render(<AuthFormComponent type={FormType.signin} />)

    const submitButton = getByTestId(/form-submit/i)
    expect(submitButton).toHaveTextContent(/sign in/i)

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0)
    userEvent.click(submitButton)
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1)
  })

  test('type sign up', () => {
    const { getByTestId, debug } = render(<AuthFormComponent type={FormType.signup} />)

    const submitButton = getByTestId(/form-submit/i)
    expect(submitButton).toHaveTextContent(/sign up/i)

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(0)
    userEvent.click(submitButton)
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1)
  })

  test('type change works properly', () => {
    const { getByTestId, getByRole } = render(<AuthFormComponent type={FormType.signin} />)

    expect(getByTestId(/form-submit/i)).toHaveTextContent(/sign in/i)

    userEvent.click(getByRole('button', { name: /sign up/i }))
    expect(getByTestId(/form-submit/i)).toHaveTextContent(/sign up/i)

    userEvent.click(getByRole('button', { name: /^sign in$/i }))
    expect(getByTestId(/form-submit/i)).toHaveTextContent(/sign in/i)
  })
})

interface IAuthFormComponent {
  type: FormType
}
const AuthFormComponent = ({ type }: IAuthFormComponent) => {
  return (
    <InternalizationProvider>
      <AuthForm type={type} />
    </InternalizationProvider>
  )
}
