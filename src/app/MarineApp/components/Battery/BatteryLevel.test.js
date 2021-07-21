import { shallow } from "enzyme"
import React from "react"
import { BatteryLevel } from "./BatteryLevel"
import { BATTERY_STATE } from "../../../utils/constants"

describe("Battery level", () => {
  describe("when battery is charging", () => {
    const wrapper = shallow(<BatteryLevel battery={{ state: BATTERY_STATE.CHARGING, soc: 95, timetogo: 9000 }} />)
    const translation = wrapper.find('[data-test-id="batteryStatus"]')
    const valueTranslation = translation.props().value

    it("should show battery level", () => {
      expect(wrapper.text()).toContain("95%")
    })

    it("should show charging", () => {
      expect(valueTranslation).toContain("common.charging")
    })

    it("should NOT show time to go", () => {
      expect(wrapper.text()).not.toContain("2h 30m")
    })
  })

  describe("when battery is discharging", () => {
    const wrapper = shallow(<BatteryLevel battery={{ state: BATTERY_STATE.DISCHARGING, soc: 95, timetogo: 9000 }} />)
    const translation = wrapper.find('[data-test-id="batteryStatus"]')
    const valueTranslation = translation.props().value

    it("should show battery level", () => {
      expect(wrapper.text()).toContain("95%")
    })

    it("should show discharging", () => {
      expect(valueTranslation).toContain("common.discharging")
    })

    it("should show time to go", () => {
      expect(wrapper.text()).toContain("2 hours")
    })
  })

  describe("when battery is idle", () => {
    const wrapper = shallow(<BatteryLevel battery={{ state: BATTERY_STATE.IDLE, soc: 95, timetogo: 9000 }} />)
    const translation = wrapper.find('[data-test-id="batteryStatus"]')
    const valueTranslation = translation.props().value

    it("should show battery level", () => {
      expect(wrapper.text()).toContain("95%")
    })

    it("should show charging", () => {
      expect(valueTranslation).toContain("common.idle")
    })

    it("should NOT show time to go", () => {
      expect(wrapper.text()).not.toContain("2h 30m")
    })
  })
})
