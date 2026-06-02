import React from "react"
import { render } from "@testing-library/react"
import BatteriesOverview from "./BatteriesOverview"

describe("BatteriesOverview element", () => {
  describe("compact mode", () => {
    it("should show content", () => {
      const { container } = render(<BatteriesOverview componentMode="compact" />)
      expect(container.firstChild).toBeTruthy()
    })

    it("should show expand link", () => {
      const { container } = render(<BatteriesOverview componentMode="compact" />)
      expect(container.querySelector("[data-testid='expand-icon']")).toBeInTheDocument()
    })
  })

  describe("full mode", () => {
    it("should use full mode by default", () => {
      const { container } = render(<BatteriesOverview />)
      expect(container.querySelector("[data-testid='grid-paginator']")).toBeInTheDocument()
    })

    it("should show content", () => {
      const { container } = render(<BatteriesOverview />)
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
