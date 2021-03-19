import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import { AuthProvider } from 'context/Auth/AuthContext'
import { SettingsProvider } from 'context/GameManager/SettingsContext'
import { InternalizationProvider } from 'context/Internalization/InternalizationContext'
import Router from 'context/Router/Router'
import { RouterContextProvider } from 'context/Router/RouterContext'
import useLoadSpeechGrammar from 'hooks/useLoadSpeechGrammar'
import { useThemeFromLocalStorage } from 'hooks/useThemeFromLocalStorage'
import { checkApiSupport } from 'utils/checkApiSupport'

const apiSupport = checkApiSupport()

function App() {
  useThemeFromLocalStorage()
  useLoadSpeechGrammar()

  if (!apiSupport) {
    return <h1 className="unsupported">Browser Unsupported</h1>
  }

  return (
    <SettingsProvider>
      <AuthProvider>
        <RouterContextProvider>
          <div className="app">
            <InternalizationProvider>
              <Header />
              <Router />
              <Footer />
            </InternalizationProvider>
          </div>
        </RouterContextProvider>
      </AuthProvider>
    </SettingsProvider>
  )
}

export default App
