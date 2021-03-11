import LastLetter from '../Text/LastLetter'

import styles from './GameUI.module.scss'

const UserScreen = () => {
  return (
    <>
      <h1 className={styles.info}>You must find a name from the last letter</h1>
      <h1 className={styles.word}>
        <LastLetter text='Alican' />
      </h1>
    </>
  )
}

export default UserScreen
