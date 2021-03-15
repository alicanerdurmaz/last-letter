import { useState, createContext, useContext, useEffect } from 'react'

import firebase, { auth, useFirestore } from 'hooks/useFirebase'

interface ICurrentUser {
  user: firebase.User | null
  score: number
}
interface IAuthContext {
  currentUser: ICurrentUser | null
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null)

  const getUserScore = async (displayName: string | null) => {
    if (!displayName) return 0

    const { firestore } = await useFirestore()
    const docRef = firestore.collection('users').doc(displayName)
    const doc = await docRef.get()

    return doc?.data()?.score || 0
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        getUserScore(authUser.displayName).then((score: number) => {
          setCurrentUser({
            user: authUser,
            score: score,
          })
        })
      } else {
        setCurrentUser(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('AuthContext must be used within a AuthContextProvider')
  }
  return context
}
