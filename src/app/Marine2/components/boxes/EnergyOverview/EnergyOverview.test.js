import React from "react"
import { render } from "@testing-library/react"
import EnergyOverview from "./EnergyOverview"

describe("EnergyOverview element", () => {
  describe("compact mode", () => {
    it("should show content", () => {
      const { container } = render(<EnergyOverview componentMode="compact" />)
      expect(container.firstChild).toBeTruthy()
    })

    it("should show expand link", () => {
      const { container } = render(<EnergyOverview componentMode="compact" />)
      expect(container.querySelector("[data-testid='expand-icon']")).toBeInTheDocument()
    })
  })

  describe("full mode", () => {
    it("should use full mode by default", () => {
      const { container } = render(<EnergyOverview />)
      expect(container.querySelector("[data-testid='grid-paginator']")).toBeInTheDocument()
    })

    it("should show content", () => {
      const { container } = render(<EnergyOverview />)
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
