import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import {
  AppLangugage,
  InternalizationProvider,
  useInternalizationCtx,
} from 'context/Internalization/InternalizationContext'

jest.mock('context/Internalization/en.json', () => ({
  test: 'test',
}))
jest.mock('context/Internalization/tr.json', () => ({
  test: 'deneme',
}))

const ContextConsumer = ({ changeLang, showText }: { changeLang: AppLangugage; showText: string }) => {
  const { t, setAppLanguage } = useInternalizationCtx()

  return (
    <div>
      <h1 data-testid="title">{t(showText)}</h1>
      <button data-testid="changeLang" onClick={() => setAppLanguage(changeLang)}></button>
    </div>
  )
}

test('ContextConsumer shows default value', () => {
  const { getByTestId } = render(
    <InternalizationProvider>
      <ContextConsumer changeLang="en-US" showText="test" />
    </InternalizationProvider>,
  )

  expect(getByTestId('title')).toHaveTextContent('deneme')

  userEvent.click(getByTestId('changeLang'))

  expect(getByTestId('title')).toHaveTextContent('test')
})

test('Change Language works', () => {
  const { getByTestId } = render(
    <InternalizationProvider>
      <ContextConsumer changeLang="en-US" showText="test" />
    </InternalizationProvider>,
  )

  userEvent.click(getByTestId('changeLang'))

  expect(getByTestId('title')).toHaveTextContent('test')
})

test('if value not exist, should throw console.error', () => {
  console.error = jest.fn()
  render(
    <InternalizationProvider>
      <ContextConsumer changeLang="en-US" showText="valueNotExist" />
    </InternalizationProvider>,
  )
  expect(console.error).toHaveBeenCalled()
})
