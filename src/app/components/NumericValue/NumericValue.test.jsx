import React from "react"
import { render, screen } from "@testing-library/react"
import NumericValue from "./NumericValue"

describe("Number display", () => {
  it("shows dashes when no value given", () => {
    render(<NumericValue />)
    expect(screen.getByText("-", { exact: false })).toBeInTheDocument()
  })

  it("displays 0 values", () => {
    render(<NumericValue value={0} />)
    expect(screen.getByText("0")).toBeInTheDocument()
  })

  it("adds a unit to the value passed", () => {
    render(<NumericValue value={123} unit="A" />)
    expect(screen.getByText("123A")).toBeInTheDocument()
  })
})
