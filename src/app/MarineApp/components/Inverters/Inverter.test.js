import React from "react"
import { render } from "@testing-library/react"
import { Inverter } from "./Inverter"

describe("Inverter", () => {
  it("renders as a regular inverter", () => {
    const { container } = render(<Inverter isVebusInverter={false} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders as nonVebusInverter with 0 AC inputs", () => {
    const { container } = render(<Inverter isVebusInverter={true} nAcInputs={0} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("does not render nonVebusInverter with 1 AC input", () => {
    const { container } = render(<Inverter isVebusInverter={true} nAcInputs={1} />)
    expect(container.firstChild).toBeNull()
  })
})
