import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Box from '~/components/ui/Box'
import ArrowRightIcon from '~/public/icons/arrow-right.svg'

test('renders children with title', async () => {
  render(
    <Box title='test title'>
      <div>test content</div>
    </Box>
  )

  const container = screen.getByRole('container')

  expect(container).toBeInTheDocument()
  expect(container).toHaveTextContent('test content')
  expect(container).toHaveTextContent('test title')
  expect(screen.getByRole('heading')).toBeInTheDocument()
})

test('renders icon', async () => {
  render(
    <Box title='test title' icon={<ArrowRightIcon />}>
      <></>
    </Box>
  )

  expect(screen.getByRole('img')).toBeInTheDocument()
})

test('renders href', async () => {
  render(
    <Box title='test title' onExpandHref={'://test.link.to'}>
      <></>
    </Box>
  )

  const container = screen.getByRole('container')
  const href = container.querySelector('a')

  expect(href).toBeInTheDocument()
  expect(href).toHaveAttribute('href', expect.stringContaining('://test.link.to'))
})
