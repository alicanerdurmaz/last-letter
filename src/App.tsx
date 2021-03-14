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
import { GameLoopProvider } from './context/GameManager/GameLoop'
import useLoadSpeechGrammar from './hooks/useSpeechGrammar'

const apiSupport = checkApiSupport()

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false)

  useThemeFromLocalStorage()
  useLoadSpeechGrammar()

  if (!apiSupport) {
    return <h1 className="unsupported">Browser Unsupported</h1>
  }

  return (
    <InternalizationProvider>
      <div className="app">
        <Logo setIsGameStarted={setIsGameStarted} isGameStarted={isGameStarted} />

        <SettingsProvider>
          {isGameStarted ? (
            <GameManagerProvider>
              <GameLoopProvider>
                <GameUI />
              </GameLoopProvider>
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
