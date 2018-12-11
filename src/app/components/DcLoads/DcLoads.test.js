import { DcLoads } from "./DcLoads"
import { shallow } from "enzyme"
import React from "react"

describe("DC Loads", () => {
  describe("when valid", () => {
    const wrapper = shallow(<DcLoads voltage={12.345} power={98.765} hasDcSystem={"1"} />)

    it("shows current", () => {
      const current = wrapper
        .find("NumericValue")
        .first()
        .props()

      expect(current.value).toEqual(98.765 / 12.345, "Current should be voltage divided by power")
      expect(current.precision).toEqual(1, "Current should be displayed with one value")
    })

    it("shows power", () => {
      const power = wrapper
        .find("NumericValue")
        .at(1)
        .props()

      expect(power.value).toEqual(98.765)
      expect(power.precision).toBeUndefined()
    })
  })

  describe("when voltage is empty", () => {
    const wrapper = shallow(<DcLoads power={98.765} hasDcSystem={1} />)

    it("shows empty current", () => {
      expect(
        wrapper
          .find("NumericValue")
          .first()
          .props().value
      ).toBeUndefined()
    })
  })

  describe("when DC Power is not enabled", () => {
    const wrapper = shallow(<DcLoads power={98.765} hasDcSystem={0} />)

    it("shows hint to the user", () => {
      expect(wrapper.text()).toContain("Has DC System")
    })
  })

  describe("when values aren't loaded yet", () => {
    const wrapper = shallow(<DcLoads />)

    it("shows empty current", () => {
      expect(
        wrapper
          .find("NumericValue")
          .first()
          .props().value
      ).toBeUndefined()
    })

    it("shows empty power", () => {
      expect(
        wrapper
          .find("NumericValue")
          .at(1)
          .props().value
      ).toBeUndefined()
    })
  })
})
