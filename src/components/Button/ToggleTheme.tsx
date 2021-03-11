import { useState } from 'react'
import SunIcon from '../Icons/SunIcon'
import MoonIcon from '../Icons/MoonIcon'

import styles from './ToggleTheme.module.scss'

const ToggleTheme = () => {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark')

  const setThemeHandler = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    setTheme(theme)
  }

  return (
    <div className={styles.container}>
      {theme === 'light' ? (
        <button onClick={() => setThemeHandler('dark')}>
          <MoonIcon />
        </button>
      ) : (
        <button onClick={() => setThemeHandler('light')}>
          <SunIcon />
        </button>
      )}
    </div>
  )
}

export default ToggleTheme
