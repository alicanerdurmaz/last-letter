import Game from 'screens/Game'
import GameOver, { IGameOver } from 'screens/GameOver'
import Home from 'screens/Home'
import MicPermissionDenied from 'screens/MicPermissionDenied'

import { Routes, useRouterContext } from './RouterContext'

const Router = () => {
  const { activeRoute } = useRouterContext()

  const SelectedRoute = () => {
    switch (activeRoute.name) {
      case Routes.home:
        return <Home />
      case Routes.game:
        return <Game />
      case Routes.gameOver:
        const { description, usedWords, winner, lastUsedWord } = activeRoute.routeProps as IGameOver
        return <GameOver lastUsedWord={lastUsedWord} description={description} usedWords={usedWords} winner={winner} />
      case Routes.MicPermissionDenied:
        return <MicPermissionDenied />
      default:
        return <Home />
    }
  }
  return <SelectedRoute />
}

export default Router
