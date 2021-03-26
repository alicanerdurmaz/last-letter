import { useState } from 'react'

import cx from 'classnames'

import Modal from 'components/Modal/Modal'
import { useAuthContext } from 'context/Auth/AuthContext'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'
import { Routes, useRouterContext } from 'context/Router/RouterContext'
import { auth } from 'hooks/useFirebase'

import AuthForm, { FormTypeEnum, FormType } from './AuthForm'
import styles from './OpenAuthForm.module.scss'

const OpenAuthForm = () => {
  const { currentUser } = useAuthContext()
  const { getActiveRoute, changeRoute } = useRouterContext()
  const { t } = useInternalizationCtx()
  const [isAuthFormOpen, setIsAuthFormOpen] = useState<FormType>(FormTypeEnum.closed)

  const openAuthForm = (type: FormType) => {
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

  const signOut = async () => {
    setIsAuthFormOpen(FormTypeEnum.closed)

    if (getActiveRoute() === Routes.game) {
      if (window.confirm(t('alertForExit'))) {
        await auth.signOut()
        changeRoute(Routes.home)
        return
      }
    }

    await auth.signOut()
  }

  if (currentUser) {
    return (
      <div className={cx(styles.welcome, styles.container)}>
        <p>
          {t('welcome')}, {currentUser?.user?.displayName} ｜ <span onClick={signOut}>{t('signout')}</span>
        </p>
      </div>
    )
  }

  return (
    <div className={cx(styles.toggleForm, styles.container)}>
      <p onClick={() => openAuthForm(FormTypeEnum.signin)}>{t('signin')}</p>
      <span>{t('or')}</span>
      <p onClick={() => openAuthForm(FormTypeEnum.signup)}>{t('signup')}</p>

      <Modal isOpen={!!isAuthFormOpen} setIsOpen={() => setIsAuthFormOpen(false)} closeOnClickOutside={false}>
        <AuthForm type={isAuthFormOpen} />
      </Modal>
    </div>
  )
}

export default OpenAuthForm
