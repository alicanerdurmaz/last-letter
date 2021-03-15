import { createContext, useContext, useState } from 'react'

import GameOver, { IGameOver } from 'components/GameUI/GameOver'
import GameScreen from 'screens/GameScreen'
import HomeScreen from 'screens/HomeScreen'
import MicPermissionDenied from 'screens/MicPermissionDenied'

interface IRouterContext {
  BrowserRouter: () => JSX.Element
  changeRoute: (routeName: number, props?: IActiveRoute['routeProps']) => void
  getActiveRoute: () => number
}

interface IActiveRoute {
  name: number
  routeProps: undefined | IGameOver
}

const RouterContext = createContext<IRouterContext | undefined>(undefined)

export const Routes = {
  home: 1,
  game: 2,
  gameOver: 3,
  MicPermissionDenied: 4,
}

export const RouterContextProvider: React.FC = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState<IActiveRoute>({
    name: Routes.home,
    routeProps: undefined,
  })

  const BrowserRouter = () => {
    switch (activeRoute.name) {
      case Routes.home:
        return <HomeScreen />
      case Routes.game:
        return <GameScreen />
      case Routes.gameOver:
        const { description, usedWords, winner } = activeRoute.routeProps as IGameOver
        return <GameOver description={description} usedWords={usedWords} winner={winner} />
      case Routes.MicPermissionDenied:
        return <MicPermissionDenied />
      default:
        return <HomeScreen />
    }
  }

  const changeRoute = (routeName: number, props?: IActiveRoute['routeProps']): void => {
    setActiveRoute({
      name: routeName,
      routeProps: props,
    })
  }

  const getActiveRoute = () => {
    return activeRoute.name
  }

  return (
    <RouterContext.Provider value={{ getActiveRoute, changeRoute, BrowserRouter }}>{children}</RouterContext.Provider>
  )
}

export const useRouterContext = () => {
  const context = useContext(RouterContext)
  if (context === undefined) {
    throw new Error('RouterContext must be used within a RouterContextProvider')
  }
  return context
}
