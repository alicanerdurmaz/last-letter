import styles from './Form.module.scss'

interface IProps {
  autoFocus?: boolean
  minLength?: number
  value: string
  label: string
  type: 'email' | 'text' | 'password'
  placeholder?: string
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  hidden?: boolean
  required?: boolean
}

const FormControl = ({
  autoFocus = false,
  type = 'text',
  placeholder,
  name,
  onChange,
  label = 'Username',
  value,
  minLength,
  hidden = false,
  required = false,
}: IProps) => {
  if (hidden) return null
  return (
    <div className={styles.formControlContainer}>
      <label htmlFor={name}>
        <small>{label}</small>
      </label>
      <input
        required={required}
        autoFocus={autoFocus}
        minLength={minLength}
        value={value}
        onChange={e => onChange && onChange(e)}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={styles.container}
      ></input>
    </div>
  )
}

export default FormControl
