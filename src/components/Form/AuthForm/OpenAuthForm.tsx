import { useState } from 'react'

import Modal from 'components/Modal/Modal'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'
import { Routes, useRouterContext } from 'context/Router/RouterContext'

import AuthForm, { FormType } from './AuthForm'
import styles from './AuthForm.module.scss'

const ToggleAuthForm = () => {
  const { getActiveRoute, changeRoute } = useRouterContext()
  const { t } = useInternalizationCtx()
  const [isAuthFormOpen, setIsAuthFormOpen] = useState<FormType>(FormType.closed)

  const onClickHandler = (type: FormType) => {
    if (getActiveRoute() === Routes.game) {
      if (window.confirm(t('alertForExit'))) {
        changeRoute(Routes.home)
        setIsAuthFormOpen(type)
        return
      }
    } else {
      setIsAuthFormOpen(type)
    }
  }

  return (
    <div className={styles.toggleForm}>
      <p onClick={() => onClickHandler(FormType.signin)}>{t('signin')}</p>
      <span>{t('or')}</span>
      <p onClick={() => onClickHandler(FormType.signup)}>{t('signup')}</p>

      <Modal isOpen={!!isAuthFormOpen} setIsOpen={() => setIsAuthFormOpen(false)} closeOnClickOutside={false}>
        <AuthForm formType={isAuthFormOpen} setIsAuthFormOpen={setIsAuthFormOpen} />
      </Modal>
    </div>
  )
}

export default ToggleAuthForm
