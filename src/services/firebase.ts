import { auth } from 'hooks/useFirebase'

interface IUserCredentials {
  email: string
  password: string
  username?: string
}

export const createUserWithEmailAndPassword = async ({ email, password, username }: IUserCredentials) => {
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password)

    await user.user?.updateProfile({
      displayName: username,
    })
  } catch (error) {
    return error.code as string
  }
}

export const signInWithEmailAndPassword = async ({ email, password }: IUserCredentials) => {
  try {
    await auth.signInWithEmailAndPassword(email, password)
  } catch (error) {
    return error.code as string
  }
}
