import React from 'react'
import { useInternalizationCtx } from '../../context/Internalization/InternalizationContext'
import LastLetter from './LastLetter'
import Button from '../Button/Button'

import styles from './GameDescription.module.scss'

const GameDescription = () => {
  const { t } = useInternalizationCtx()
  return (
    <div className={styles.container}>
      <h1 className={styles.word}>
        <LastLetter text='Hello' />
      </h1>

      <div className={styles.desc}>
        <p>{t('gameDesc-1')}</p>
        <p>{t('gameDesc-2')}</p>

        <blockquote className={styles.quote}>
          <p>Hasan &gt; Niyazi &gt; İbrahim &gt; Mustafa &gt; Ahmet</p>
        </blockquote>

        <p>{t('gameDesc-3')}</p>
      </div>

      <Button className={styles.start}>{t('start')}</Button>
    </div>
  )
}

export default GameDescription
