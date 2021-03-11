import styles from './Button.module.scss'
import cx from 'classnames'

interface IProps {
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: string
}
const Button = ({ className, onClick, children }: IProps) => {
  return (
    <button className={cx(styles.button, className)} onClick={() => console.log('clicked')}>
      {children}
    </button>
  )
}

export default Button
