import React, { useState } from 'react'

import styles from 'components/Footer/Footer.module.scss'
import TrophyIcon from 'components/Icons/TrophyIcon'
import Leaderboard from 'components/Leaderboard/Leaderboard'
import Modal from 'components/Modal/Modal'
import { useInternalizationCtx } from 'context/Internalization/InternalizationContext'

const ShowLeaderboard = () => {
  const { t } = useInternalizationCtx()
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  return (
    <>
      <div className={styles.trophy} onClick={() => setShowLeaderboard(prevState => !prevState)}>
        <TrophyIcon />
        <h1>{t('leaderboard')}</h1>
      </div>
      <Modal isOpen={showLeaderboard} setIsOpen={setShowLeaderboard}>
        <Leaderboard />
      </Modal>
    </>
  )
}

export default ShowLeaderboard
