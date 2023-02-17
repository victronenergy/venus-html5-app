import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Grid from '~/components/ui/Grid'

test('renders children', async () => {
  render(
    <Grid>
      <div>Box1</div>
      <div>Box2</div>
      <div>Box3</div>
    </Grid>
  )

  const container = screen.getByRole('container')

  expect(container).toBeInTheDocument()
  expect(container).toHaveTextContent('Box1')
  expect(container).toHaveTextContent('Box2')
  expect(container).toHaveTextContent('Box3')
})

test('set correct grid flow', async () => {
  // row flow is default
  render(
    <Grid>
      <div>Box1</div>
      <div>Box2</div>
    </Grid>
  )

  const containerRow = screen.getByRole('container')
  expect(containerRow).toHaveAttribute('class', expect.stringContaining('grid-flow-row'))
  expect(containerRow).not.toHaveAttribute('class', expect.stringContaining('grid-flow-col'))

  cleanup()

  // col flow
  render(
    <Grid flow={'col'}>
      <div>Box1</div>
      <div>Box2</div>
    </Grid>
  )

  const containerCol = screen.getByRole('container')

  expect(containerCol).toHaveAttribute('class', expect.stringContaining('grid-flow-col'))
  expect(containerCol).not.toHaveAttribute('class', expect.stringContaining('grid-flow-row'))
})

test('use correct col span if 3 boxes and row flow', async () => {
  // row flow is default
  render(
    <Grid>
      <div>Box1</div>
      <div>Box2</div>
      <div>Box3</div>
    </Grid>
  )

  const container = screen.getByRole('container')
  const boxes = container.childNodes

  expect(boxes.length).toBe(3)
  expect(container).toHaveAttribute('class', expect.stringContaining('grid-cols-2'))
  expect(boxes[boxes.length - 1]).toHaveAttribute('class', expect.stringContaining('col-span-2'))
})

test('use correct row span if 3 boxes and col flow', async () => {
  // row flow is default
  render(
    <Grid flow={'col'}>
      <div>Box1</div>
      <div>Box2</div>
      <div>Box3</div>
    </Grid>
  )

  const container = screen.getByRole('container')
  const boxes = container.childNodes

  expect(boxes.length).toBe(3)
  expect(container).toHaveAttribute('class', expect.stringContaining('grid-rows-2'))
  expect(boxes[boxes.length - 1]).toHaveAttribute('class', expect.stringContaining('row-span-2'))
})

test.todo('rearrange boxes to col if height dimensions more than width by ratio')
test.todo('rearrange boxes to col if height dimensions less than width by ratio')
