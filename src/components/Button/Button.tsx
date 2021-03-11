import styles from './Button.module.scss'
import cx from 'classnames'

interface IProps {
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: string
  color?: 'primary' | 'warning' | 'error'
}
const Button = ({ className, onClick, children, color = 'primary' }: IProps) => {
  return (
    <button className={cx(styles.button, styles[color], className)} onClick={() => console.log('clicked')}>
      {children}
    </button>
  )
}

export default Button
