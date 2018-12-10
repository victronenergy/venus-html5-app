import { shallow } from "enzyme"
import React from "react"
import { BatteryLevelContainer } from "./Battery"
import { BATTERY_STATE } from "../../utils/constants"

describe("Battery level", () => {
  describe("when battery is charging", () => {
    const wrapper = shallow(<BatteryLevelContainer state={BATTERY_STATE.CHARGING} soc={95} timeToGo={9000} />)

    it("should show battery level", () => {
      expect(wrapper.text()).toContain("95%")
    })

    it("should show charging", () => {
      expect(wrapper.text()).toContain("Charging")
    })

    it("should NOT show time to go", () => {
      expect(wrapper.text()).not.toContain("2h 30m")
    })
  })

  describe("when battery is discharging", () => {
    const wrapper = shallow(<BatteryLevelContainer state={BATTERY_STATE.DISCHARGING} soc={95} timeToGo={9000} />)

    it("should show battery level", () => {
      expect(wrapper.text()).toContain("95%")
    })

    it("should show discharging", () => {
      expect(wrapper.text()).toContain("Discharging")
    })

    it("should show time to go", () => {
      expect(wrapper.text()).toContain("2h 30m")
    })
  })

  describe("when battery is idle", () => {
    const wrapper = shallow(<BatteryLevelContainer state={BATTERY_STATE.IDLE} soc={95} timeToGo={9000} />)

    it("should show battery level", () => {
      expect(wrapper.text()).toContain("95%")
    })

    it("should show charging", () => {
      expect(wrapper.text()).toContain("Idle")
    })

    it("should NOT show time to go", () => {
      expect(wrapper.text()).not.toContain("2h 30m")
    })
  })
})
