import Button from 'components/Button/Button'
import Spinner from 'components/LoadingIndicator/Spinner'

import styles from './Form.module.scss'

interface IProps {
  children?: React.ReactNode
  loading?: boolean
}

const FormSubmit = ({ children, loading }: IProps) => {
  return (
    <Button type="submit" className={styles.submitButton}>
      {loading ? <Spinner color={false} /> : children}
    </Button>
  )
}

export default FormSubmit
