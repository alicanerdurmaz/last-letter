import styles from 'components/Text/GameDescription.module.scss'
import LastLetter from 'components/Text/LastLetter'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

const GameDescription = () => {
  const { t } = useInternalizationCtx()

  return (
    <div className={styles.container}>
      <h1 className={styles.word}>
        <LastLetter text={t('hello')} />
      </h1>

      <div className={styles.desc}>
        <p>{t('gameDesc-1')}</p>
        <p>{t('gameDesc-2')}</p>

        <blockquote className={styles.quote}>
          <p>Hasan &gt; Niyazi &gt; İbrahim &gt; Mustafa &gt; Ahmet</p>
        </blockquote>

        <p>{t('gameDesc-3')}</p>
      </div>
    </div>
  )
}

export default GameDescription
