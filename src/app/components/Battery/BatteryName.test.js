import { shallow } from "enzyme"
import React from "react"
import { BatteryName } from "./BatteryName"

describe("Battery name", () => {
  it("shows product name", () => {
    const wrapper = shallow(<BatteryName productName="BMV 700" batteryChannel={0} index={1} />)
    expect(wrapper.text()).toEqual("BMV 700 (1)")
  })

  it("shows custom name", () => {
    const wrapper = shallow(<BatteryName customName="MY BMV" productName="BMV 700" batteryChannel={0} index={1} />)
    expect(wrapper.text()).toEqual("MY BMV (1)")
  })

  it("has fallback when no name exists for channel 0", () => {
    const wrapper = shallow(<BatteryName batteryChannel={0} index={1} />)
    expect(wrapper.text()).toEqual("Battery (1)")
  })

  it("has fallback when no name exists for channel 1", () => {
    const wrapper = shallow(<BatteryName batteryChannel={1} index={1} />)
    expect(wrapper.text()).toEqual("Starter battery (1)")
  })

  it("does not show the index for the system batter", () => {
    const wrapper = shallow(<BatteryName batteryChannel={0} index={1} main />)
    expect(wrapper.text()).toEqual("Battery")
  })
})
