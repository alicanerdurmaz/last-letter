export const useThemeFromLocalStorage = () => {
  const root = document.documentElement
  const theme = localStorage.getItem('theme')

  if (theme && theme !== root.getAttribute('data-theme')) {
    root.setAttribute('data-theme', theme)
  } else {
    root.setAttribute('data-theme', 'dark')
  }
}
