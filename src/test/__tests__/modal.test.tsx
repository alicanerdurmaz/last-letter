import { useState } from 'react'

import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import Modal from 'components/Modal/Modal'

const Wrapper = ({ defaultValue }: { defaultValue: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultValue)

  return (
    <div data-testid="outside">
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} closeOnClickOutside={true}>
        <h1 data-testid="content">Modal Content</h1>
      </Modal>
      <button data-testid="openButton" onClick={() => setIsOpen(true)}>
        open modal
      </button>
    </div>
  )
}
test('modal works properly', async () => {
  const { getByTestId, queryByTestId } = render(<Wrapper defaultValue={false} />)

  await waitFor(() => {
    expect(queryByTestId('content')).not.toBeInTheDocument()
  })

  userEvent.click(getByTestId('openButton'))

  await waitFor(() => {
    expect(queryByTestId('content')).toBeInTheDocument()
  })
})

test('modal closes when click outside', async () => {
  const { getByTestId, queryByTestId } = render(<Wrapper defaultValue={true} />)

  userEvent.click(getByTestId('outside'))

  await waitFor(() => {
    expect(queryByTestId('content')).not.toBeInTheDocument()
  })
})

test('modal closes when click close button', async () => {
  const { queryByTestId, getByLabelText } = render(<Wrapper defaultValue={true} />)

  userEvent.click(getByLabelText('close'))

  await waitFor(() => {
    expect(queryByTestId('content')).not.toBeInTheDocument()
  })
})

test('modal closes when click esc key', async () => {
  const { queryByTestId } = render(<Wrapper defaultValue={true} />)

  fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })

  await waitFor(() => {
    expect(queryByTestId('content')).not.toBeInTheDocument()
  })
})
