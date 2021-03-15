import { useState, createContext, useContext, useEffect } from 'react'

import firebase, { auth } from 'hooks/useFirebase'

interface IAuthContext {
  currentUser: firebase.User | null
}
const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      authUser ? setCurrentUser(authUser) : setCurrentUser(null)
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
