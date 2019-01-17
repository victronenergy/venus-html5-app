import { Inverter } from "./Inverter"
import { shallow } from "enzyme"
import React from "react"

describe("Inverter", () => {
  it("exists as a regular inverter", () => {
    const wrapper = shallow(<Inverter isVebusInverter={false} />)
    console.log(wrapper)
    expect(wrapper.type()).toBe("div")
  })

  it("exist as nonVebusInverter with 0 AC inputs", () => {
    const wrapper = shallow(<Inverter isVebusInverter={true} nAcInputs={0} />)
    console.log(wrapper)
    expect(wrapper.type()).toBe("div")
  })

  it("not exist nonVebusInverter with 1 AC input", () => {
    const wrapper = shallow(<Inverter isVebusInverter={true} nAcInputs={1} />)
    console.log(wrapper)
    expect(wrapper.type()).toBe(null)
  })
})
