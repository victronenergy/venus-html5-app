import React from "react"
import { render } from "@testing-library/react"
import Tanks from "./Tanks"

describe("Tanks element", () => {
  describe("compact mode", () => {
    it("should show content", () => {
      const { container } = render(<Tanks componentMode="compact" />)
      expect(container.firstChild).toBeTruthy()
    })

    it("should show expand link", () => {
      const { container } = render(<Tanks componentMode="compact" />)
      expect(container.querySelector("[data-testid='expand-icon']")).toBeInTheDocument()
    })
  })

  describe("full mode", () => {
    it("should show content", () => {
      const { container } = render(<Tanks />)
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe("todo", () => {
    it.todo("should show summary")
    it.todo("should show details")
    it.todo("should correctly pass props to GridPaginator")
    it.todo("should handle separate pageSelectorPropsSetter")
  })
})
