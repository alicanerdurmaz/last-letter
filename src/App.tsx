import { useState } from 'react'

import Footer from 'components/Footer/Footer'
import GameUI from 'components/GameUI/GameUI'
import Header from 'components/Header/Header'
import HomeUI from 'components/HomeUI/HomeUI'
import { AuthProvider } from 'context/Auth/AuthContext'
import { GameLoopProvider } from 'context/GameManager/GameLoop'
import { GameManagerProvider } from 'context/GameManager/GameManagerContext'
import { SettingsProvider } from 'context/GameManager/SettingsContext'
import { InternalizationProvider } from 'context/Internalization/InternalizationContext'
import useLoadSpeechGrammar from 'hooks/useLoadSpeechGrammar'
import { useThemeFromLocalStorage } from 'hooks/useThemeFromLocalStorage'
import { checkApiSupport } from 'utils/checkApiSupport'

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
      <AuthProvider>
        <div className="app">
          <Header setIsGameStarted={setIsGameStarted} isGameStarted={isGameStarted} />

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
      </AuthProvider>
    </InternalizationProvider>
  )
}

export default App
