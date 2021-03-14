import { useRef } from 'react'

import { createPortal } from 'react-dom'
import FocusLock from 'react-focus-lock'

import useOnClickOutside from 'hooks/useOnClickOutside'

import styles from './Modal.module.scss'

interface IProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}
const Modal = ({ isOpen, setIsOpen, children }: IProps) => {
  const childrenRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(childrenRef, () => setIsOpen(false))

  if (!isOpen) return null

  return createPortal(
    <FocusLock>
      <div className={styles.container}>
        <div ref={childrenRef}>{children}</div>
      </div>
    </FocusLock>,
    document.getElementById('root') || document.body,
  )
}

export default Modal
