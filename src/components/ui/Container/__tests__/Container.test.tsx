import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Container from '../Container'

test('renders component inside Container', async () => {
  render(
    <Container>
      <div>test content</div>
    </Container>
  )

  expect(screen.getByRole('container')).toBeInTheDocument()
  expect(screen.getByRole('container')).toHaveTextContent('test content')
  expect(screen.getByText('test content')).toBeInTheDocument()
})
