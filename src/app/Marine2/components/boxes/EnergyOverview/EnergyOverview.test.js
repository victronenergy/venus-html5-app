import React from "react"
import { render, waitFor } from "@testing-library/react"
import EnergyOverview from "./EnergyOverview"

describe("EnergyOverview element", () => {
  describe("compact mode", () => {
    it("should show content", async () => {
      const { container } = render(<EnergyOverview componentMode="compact" />)
      await waitFor(() => expect(container.firstChild).toBeTruthy())
    })

    it("should show expand link", async () => {
      const { container } = render(<EnergyOverview componentMode="compact" />)
      await waitFor(() => expect(container.querySelector("[data-testid='expand-icon']")).toBeInTheDocument())
    })
  })

  describe("full mode", () => {
    it("should use full mode by default", async () => {
      const { container } = render(<EnergyOverview />)
      await waitFor(() => expect(container.querySelector("[data-testid='grid-paginator']")).toBeInTheDocument())
    })

    it("should show content", async () => {
      const { container } = render(<EnergyOverview />)
      await waitFor(() => expect(container.firstChild).toBeTruthy())
    })
  })

  describe("todo", () => {
    it.todo("should show summary")
    it.todo("should show details")
    it.todo("should correctly pass props to GridPaginator")
    it.todo("should handle separate pageSelectorPropsSetter")
  })
})
