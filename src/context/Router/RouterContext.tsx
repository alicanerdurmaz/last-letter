import { createContext, useContext, useState } from 'react'

import { IGameOver } from 'screens/GameOver'

interface IRouterContext {
  activeRoute: IActiveRoute
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
    <RouterContext.Provider value={{ activeRoute, getActiveRoute, changeRoute }}>{children}</RouterContext.Provider>
  )
}

export const useRouterContext = () => {
  const context = useContext(RouterContext)
  if (context === undefined) {
    throw new Error('RouterContext must be used within a RouterContextProvider')
  }
  return context
}
