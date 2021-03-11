import { useState } from 'react'
import { GameManagerProvider } from './context/GameManager/GameManagerContext'
import { InternalizationProvider } from './context/Internalization/InternalizationContext'
import { useThemeFromLocalStorage } from './hooks/useThemeFromLocalStorage'
import HomeUI from './components/HomeUI/HomeUI'
import Footer from './components/Footer/Footer'
import Logo from './components/Logo/Logo'
import GameUI from './components/GameUI/GameUI'
import { SettingsProvider } from './context/GameManager/SettingsContext'
import { checkApiSupport } from './utils/checkApiSupport'

const apiSupport = checkApiSupport()

function App() {
  useThemeFromLocalStorage()

  const [isGameStarted, setIsGameStarted] = useState(false)

  if (!apiSupport) {
    return <h1>Browser Desteklemiyor</h1>
  }
  return (
    <InternalizationProvider>
      <div className='app'>
        <Logo setIsGameStarted={setIsGameStarted} isGameStarted={isGameStarted} />

        <SettingsProvider>
          {isGameStarted ? (
            <GameManagerProvider>
              <GameUI />
            </GameManagerProvider>
          ) : (
            <HomeUI setIsGameStarted={setIsGameStarted} />
          )}
        </SettingsProvider>

        <Footer isGameStarted={isGameStarted} />
      </div>
    </InternalizationProvider>
  )
}

export default App
