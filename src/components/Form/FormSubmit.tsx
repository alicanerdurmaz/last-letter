import Button from 'components/Button/Button'

import styles from './Form.module.scss'

const FormSubmit: React.FC = ({ children }) => {
  return (
    <Button type="submit" className={styles.submitButton}>
      {children}
    </Button>
  )
}

export default FormSubmit
