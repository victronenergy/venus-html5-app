import '@testing-library/jest-dom/extend-expect'
import { setConfig } from 'next/config'
import { routerMock } from '../__mocks__/router'
import { FC } from 'react'

// mocks for next.config.js
setConfig({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
})

// mocks for next/router
jest.mock('next/router', () => ({
  ...routerMock,
  withRouter: (component: FC) => {
    component.defaultProps = {
      ...component.defaultProps,
      router: routerMock,
    }
    return component
  },
  useRouter: () => {
    return { ...routerMock }
  },
}))
