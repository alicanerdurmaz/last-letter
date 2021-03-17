import styles from './Form.module.scss'
import { FormControl } from './FormControl'

interface IProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  disabled?: boolean
  children?: React.ReactNode
}

export const Form = ({ disabled, children, onSubmit }: IProps) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <fieldset className={styles.fieldset} disabled></fieldset>
      {children}
    </form>
  )
}

Form.FormControl = FormControl
