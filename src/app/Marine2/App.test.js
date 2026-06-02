import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

describe("App element", () => {
  describe("error boundary", () => {
    it("should render without crashing", () => {
      const { container } = render(<App />)
      expect(container).toBeInTheDocument()
    })
  })

  describe("todo", () => {
    it.todo("should show content")
  })
})
