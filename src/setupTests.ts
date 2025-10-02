// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import { configure } from "enzyme"
import Adapter from "@cfaester/enzyme-adapter-react-18"

configure({ adapter: new Adapter() })

// Suppress React 18 findDOMNode deprecation warnings from Enzyme
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("findDOMNode is deprecated")) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
