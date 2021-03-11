import SunIcon from '../Icons/SunIcon'
import MoonIcon from '../Icons/MoonIcon'

import styles from './Footer.module.scss'
import { useState } from 'react'

const Footer = () => {
  const [theme, setTheme] = useState('dark')

  const setThemeHandler = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    setTheme(theme)
  }

  return (
    <footer className={styles.container}>
      <div className={styles.selectThemeContainer}>
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
    </footer>
  )
}

export default Footer
