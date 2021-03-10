import Logo from './components/Logo/Logo'
import { InternalizationProvider } from './context/Internalization/InternalizationContext'

function App() {
  return (
    <InternalizationProvider>
      <div className='App'>
        <Logo />
      </div>
    </InternalizationProvider>
  )
}

export default App
