import { memo } from 'react'

import cx from 'classnames'

import styles from 'components/Button/Button.module.scss'

interface IProps {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
  color?: 'outlined' | ''
}
const Button = ({ type = 'button', className, onClick, children, color = '' }: IProps) => {
  return (
    <button type={type} className={cx(styles.button, styles[color], className)} onClick={onClick}>
      {children}
    </button>
  )
}

function areEqual(prevProps: IProps, nextProps: IProps) {
  return prevProps.children === nextProps.children
}

export default memo(Button, areEqual)
