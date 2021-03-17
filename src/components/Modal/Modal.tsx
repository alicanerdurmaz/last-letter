import { useRef, useEffect } from 'react'

import { createPortal } from 'react-dom'
import FocusLock from 'react-focus-lock'

import TimesIcon from 'components/Icons/TimesIcon'
import useOnClickOutside from 'hooks/useOnClickOutside'

import styles from './Modal.module.scss'

interface IProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
  closeOnClickOutside?: boolean
}
const Modal = ({ isOpen, setIsOpen, children, closeOnClickOutside = true }: IProps) => {
  const childrenRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(childrenRef, () => closeOnClickOutside && setIsOpen(false))

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  if (!isOpen) return null

  return createPortal(
    <FocusLock>
      <div className={styles.container}>
        <div className={styles.childrenContainer} ref={childrenRef}>
          <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
            <TimesIcon />
          </button>
          {children}
        </div>
      </div>
    </FocusLock>,
    document.getElementById('root') || document.body,
  )
}

export default Modal
