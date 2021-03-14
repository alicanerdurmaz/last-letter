import { memo } from 'react'

import styles from './LastLetter.module.scss'
interface IProps {
  text: string
}

const LastLetter = ({ text }: IProps) => {
  const textLastIndex = text.length - 1

  const textWithoutLastLetter = text.slice(0, textLastIndex)

  return (
    <span>
      {textWithoutLastLetter}
      <span className={styles.lastLetter}>{text[textLastIndex]}</span>
    </span>
  )
}

export default memo(LastLetter)
