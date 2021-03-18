import { useRouterContext } from './RouterContext'

const Router = () => {
  const { BrowserRouter } = useRouterContext()
  return <BrowserRouter />
}

export default Router
