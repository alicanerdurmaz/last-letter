import styles from './TextInput.module.scss'

interface IProps {
  autoFocus?: boolean
  minLength?: number
  value: string
  label: string
  type: 'email' | 'text' | 'password'
  placeholder?: string
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const TextInput = ({
  autoFocus = false,
  type = 'text',
  placeholder,
  name,
  onChange,
  label = 'Username',
  value,
  minLength,
}: IProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>
        <span>{label}</span>
      </label>
      <input
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

export default TextInput
