import { SettingsProvider } from 'context/GameManager/SettingsContext'

import { useRouterContext } from './RouterContext'

const Router = () => {
  const { BrowserRouter } = useRouterContext()
  return (
    <SettingsProvider>
      <BrowserRouter />
    </SettingsProvider>
  )
}

export default Router
