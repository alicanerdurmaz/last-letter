import styles from './Form.module.scss'
import FormControl from './FormControl'
import FormSubmit from './FormSubmit'

interface IProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  disabled?: boolean
  children?: React.ReactNode
}

const Form = ({ disabled = false, children, onSubmit }: IProps) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <fieldset className={styles.fieldset} disabled={disabled}>
        {children}
      </fieldset>
    </form>
  )
}

Form.FormControl = FormControl
Form.SubmitButton = FormSubmit

export default Form
