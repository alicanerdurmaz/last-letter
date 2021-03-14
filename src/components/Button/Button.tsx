import { memo } from 'react'

import cx from 'classnames'

import styles from 'components/Button/Button.module.scss'

interface IProps {
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: string
  color?: 'primary' | 'warning' | 'error' | 'outlined'
}
const Button = ({ className, onClick, children, color = 'primary' }: IProps) => {
  return (
    <button className={cx(styles.button, styles[color], className)} onClick={onClick}>
      {children}
    </button>
  )
}

function areEqual(prevProps: IProps, nextProps: IProps) {
  return prevProps.children === nextProps.children
}

export default memo(Button, areEqual)
