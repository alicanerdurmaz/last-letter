import { createContext, useContext, useState } from 'react'

import GameScreen from 'screens/GameScreen'
import HomeScreen from 'screens/HomeScreen'

interface IRouterContext {
  BrowserRouter: () => JSX.Element
  setActiveRoute: React.Dispatch<React.SetStateAction<number>>
  activeRoute: number
}
const RouterContext = createContext<IRouterContext | undefined>(undefined)

export const Routes = {
  home: 1,
  game: 2,
}

export const RouterContextProvider: React.FC = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState(Routes.home)

  const BrowserRouter = () => {
    switch (activeRoute) {
      case Routes.home:
        return <HomeScreen />
      case Routes.game:
        return <GameScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <RouterContext.Provider value={{ activeRoute, BrowserRouter, setActiveRoute }}>{children}</RouterContext.Provider>
  )
}

export const useRouterContext = () => {
  const context = useContext(RouterContext)
  if (context === undefined) {
    throw new Error('RouterContext must be used within a RouterContextProvider')
  }
  return context
}
