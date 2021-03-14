import { useState } from 'react'

import Footer from './components/Footer/Footer'
import GameUI from './components/GameUI/GameUI'
import HomeUI from './components/HomeUI/HomeUI'
import Logo from './components/Logo/Logo'
import { GameLoopProvider } from './context/GameManager/GameLoop'
import { GameManagerProvider } from './context/GameManager/GameManagerContext'
import { SettingsProvider } from './context/GameManager/SettingsContext'
import { InternalizationProvider } from './context/Internalization/InternalizationContext'
import useLoadSpeechGrammar from './hooks/useSpeechGrammar'
import { useThemeFromLocalStorage } from './hooks/useThemeFromLocalStorage'
import { checkApiSupport } from './utils/checkApiSupport'

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
