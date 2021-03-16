import GameUI from 'components/GameUI/GameUI'
import { GameLoopProvider } from 'context/GameManager/GameLoop'
import { GameManagerProvider } from 'context/GameManager/GameManagerContext'

const Game = () => {
  return (
    <GameManagerProvider>
      <GameLoopProvider>
        <GameUI />
      </GameLoopProvider>
    </GameManagerProvider>
  )
}

export default Game
