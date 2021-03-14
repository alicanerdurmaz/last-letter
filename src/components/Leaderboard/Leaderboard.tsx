import cx from 'classnames'

import TrophyIcon from 'components/Icons/TrophyIcon'
import Spinner from 'components/LoadingIndicator/Spinner'
import useLeaderboardData from 'hooks/useLeaderboardData'

import styles from './Leaderboard.module.scss'

const Leaderboard = () => {
  const { leaderBoardList, loading, currentUser } = useLeaderboardData()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TrophyIcon />
        <h1>Leaderboard</h1>
      </div>

      <ul className={styles.list}>
        {loading ? (
          <Spinner />
        ) : (
          leaderBoardList.map((user, index) => {
            return (
              <li className={styles.listItem} key={user.username}>
                <small>{index + 1}</small>
                <p className={styles.username}>{user.username}</p>
                <h2 className={styles.score}>{user.score}</h2>
              </li>
            )
          })
        )}
      </ul>

      <div className={cx(styles.listItem, styles.user)}>
        {currentUser && (
          <>
            <small>{currentUser.rank}</small>
            <p className={styles.username}>{currentUser.username}</p>
            <h2 className={styles.score}>{currentUser.score}</h2>
          </>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
