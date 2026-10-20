import React from "react"
import { render } from "@testing-library/react"
import { DcLoads } from "./DcLoads"

describe("DC Loads", () => {
  describe("when valid", () => {
    it("shows current", () => {
      const { container } = render(<DcLoads voltage={12.345} power={98.765} />)
      const values = container.querySelectorAll("span")
      const currentText = values[0]?.textContent
      expect(currentText).toContain("8")
    })

    it("shows power", () => {
      const { container } = render(<DcLoads voltage={12.345} power={98.765} />)
      const values = container.querySelectorAll("span")
      const hasPower = Array.from(values).some((v) => v.textContent.includes("99"))
      expect(hasPower).toBe(true)
    })
  })

  describe("when voltage is empty", () => {
    it("shows empty current", () => {
      const { container } = render(<DcLoads power={98.765} />)
      expect(container.textContent).toContain("-")
    })
  })

  describe("when values aren't loaded yet", () => {
    it("doesn't show the widget", () => {
      const { container } = render(<DcLoads />)
      expect(container.querySelector("span")).toBeNull()
    })
  })
})
