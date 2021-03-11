import { useState } from 'react'
import { GameManagerProvider } from './context/GameManager/GameManagerContext'
import { InternalizationProvider } from './context/Internalization/InternalizationContext'
import { useThemeFromLocalStorage } from './hooks/useThemeFromLocalStorage'
import HomeUI from './components/HomeUI/HomeUI'
import Footer from './components/Footer/Footer'
import Logo from './components/Logo/Logo'
import GameUI from './components/GameUI/GameUI'

function App() {
  useThemeFromLocalStorage()

  const [isGameStarted, setIsGameStarted] = useState(false)

  return (
    <InternalizationProvider>
      <div className='app'>
        <Logo setIsGameStarted={setIsGameStarted} isGameStarted={isGameStarted} />
        <GameManagerProvider>
          {isGameStarted ? <GameUI /> : <HomeUI setIsGameStarted={setIsGameStarted} />}
        </GameManagerProvider>
        <Footer isGameStarted={isGameStarted} />
      </div>
    </InternalizationProvider>
  )
}

export default App
