import React from 'react'
import Footer from './components/Footer/Footer'

import Logo from './components/Logo/Logo'
import GameDescription from './components/Text/GameDescription'

import { InternalizationProvider } from './context/Internalization/InternalizationContext'
import { useThemeFromLocalStorage } from './hooks/useThemeFromLocalStorage'

function App() {
  useThemeFromLocalStorage()
  return (
    <InternalizationProvider>
      <div className='app'>
        <Logo />
        <div className='gameUi'>
          <GameDescription />
        </div>
        <Footer />
      </div>
    </InternalizationProvider>
  )
}

export default App
