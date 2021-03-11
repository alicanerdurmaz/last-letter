import RoundTimer from './components/GameUI/RoundTimer'
import StartGame from './components/GameUI/StartGame'
import Footer from './components/Footer/Footer'

import Logo from './components/Logo/Logo'
import GameDescription from './components/Text/GameDescription'
import { GameManagerProvider } from './context/GameManager/GameManagerContext'

import { InternalizationProvider } from './context/Internalization/InternalizationContext'
import { useThemeFromLocalStorage } from './hooks/useThemeFromLocalStorage'
import GameUI from './components/GameUI/GameUI'
import { useState } from 'react'

function App() {
  useThemeFromLocalStorage()

  const [isGameStarted, setIsGameStarted] = useState(false)

  return (
    <InternalizationProvider>
      <div className='app'>
        <Logo />
        <GameUI>
          <GameManagerProvider>
            {!isGameStarted && (
              <>
                <GameDescription />
                <StartGame setIsGameStarted={setIsGameStarted} />
                <RoundTimer />
              </>
            )}
          </GameManagerProvider>
        </GameUI>
        <Footer isGameStarted={isGameStarted} />
      </div>
    </InternalizationProvider>
  )
}

export default App
