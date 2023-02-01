import { NextRouter } from 'next/router'

export const routerMock: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  // push, replace и prefetch must be async functions
  push: async () => true,
  replace: async () => true,
  prefetch: async () => undefined,
  reload: jest.fn(),
  back: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isPreview: false,
  isReady: false,
  forward: jest.fn(),
}
