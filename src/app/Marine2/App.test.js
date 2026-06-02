import React from "react"
import { render, waitFor } from "@testing-library/react"
import App from "./App"

describe("App element", () => {
  describe("error boundary", () => {
    it("should render without crashing", async () => {
      const { container } = render(<App />)
      await waitFor(() => expect(container).toBeInTheDocument())
    })
  })

  describe("todo", () => {
    it.todo("should show content")
  })
})
