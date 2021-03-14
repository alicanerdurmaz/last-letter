import TrophyIcon from 'components/Icons/TrophyIcon'

import styles from './Leaderboard.module.scss'

const data = [
  {
    username: 'user 1',
    score: 100,
  },
  {
    username: 'user 1',
    score: 100,
  },
  {
    username: 'user 1',
    score: 100,
  },
  {
    username: 'user 1',
    score: 100,
  },
  {
    username: 'user 1',
    score: 100,
  },
  {
    username: 'user 1',
    score: 100,
  },
  {
    username: 'user 1',
    score: 100,
  },
]
const Leaderboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TrophyIcon />
        <h1>Leaderboard</h1>
      </div>

      <ul className={styles.list}>
        {data.map((user, index) => {
          return (
            <li className={styles.listItem} key={user.username}>
              <small>{index + 1}</small>
              <p className={styles.username}>{user.username}</p>
              <h2 className={styles.score}>{user.score}</h2>
            </li>
          )
        })}
      </ul>
      <footer className={styles.footer}>
        <p className={styles.username}>Your Score</p>
        <h2 className={styles.score}>99</h2>
      </footer>
    </div>
  )
}

export default Leaderboard
