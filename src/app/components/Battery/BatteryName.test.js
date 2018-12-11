import { shallow } from "enzyme"
import React from "react"
import { BatteryName } from "./BatteryName"

describe("Battery name", () => {
  describe("main battery bank", () => {
    it("shows product name for main battery", () => {
      const wrapper = shallow(<BatteryName productName="BMV 700" main />)
      expect(wrapper.text()).toEqual("BMV 700")
    })

    it("has custom fallback for the main battery", () => {
      const wrapper = shallow(<BatteryName main />)
      expect(wrapper.text()).toEqual("Main battery bank")
    })
  })

  describe("secondary battery banks - main battery", () => {
    it("shows product name", () => {
      const wrapper = shallow(<BatteryName productName="BMV 700" batteryChannel={0} index={1} />)
      expect(wrapper.text()).toEqual("BMV 700")
    })

    it("shows custom name", () => {
      const wrapper = shallow(<BatteryName customName="MY BMV" productName="BMV 700" batteryChannel={0} index={1} />)
      expect(wrapper.text()).toEqual("MY BMV")
    })

    it("has fallback when no name exists for channel 0", () => {
      const wrapper = shallow(<BatteryName batteryChannel={0} index={1} />)
      expect(wrapper.text()).toEqual("Battery 1")
    })
  })

  describe("secondary battery banks - starter battery", () => {
    it("shows custom name + starter for channel 1", () => {
      const wrapper = shallow(<BatteryName customName="MY BMV" batteryChannel={1} index={1} />)
      expect(wrapper.text()).toEqual("MY BMV (Starter)")
    })

    it("has fallback when no name exists for channel 1", () => {
      const wrapper = shallow(<BatteryName batteryChannel={1} index={1} />)
      expect(wrapper.text()).toEqual("Starter battery 1")
    })
  })
})
