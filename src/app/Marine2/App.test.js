import React from "react"
import { render, waitFor } from "@testing-library/react"
import App from "./App"

jest.mock("@victronenergy/mfd-modules", () => {
  const actual = jest.requireActual("@victronenergy/mfd-modules")
  return {
    ...actual,
    useMqtt: () => ({ boot: jest.fn() }),
  }
})

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
