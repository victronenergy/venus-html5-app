import React from "react"
import { render, waitFor } from "@testing-library/react"
import App from "./App"

vi.mock("@victronenergy/mfd-modules", async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useMqtt: () => ({ boot: vi.fn() }),
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
