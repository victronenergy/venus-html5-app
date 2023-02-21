import { DcLoads } from "./DcLoads"
import { mount } from "enzyme"
import React from "react"

describe("DC Loads", () => {
  describe("when valid", () => {
    const wrapper = mount(<DcLoads voltage={12.345} power={98.765} />)

    it("shows current", () => {
      const props = wrapper.find("NumericValue").first().props()

      expect(props.value).toEqual(98.765 / 12.345, "Current should be voltage divided by power")
      expect(props.precision).toEqual(1, "Current should be displayed with one value")
    })

    it("shows power", () => {
      const props = wrapper.find("NumericValue").at(1).props()

      expect(props.value).toEqual(98.765)
      expect(props.precision).toBeUndefined()
    })
  })

  describe("when voltage is empty", () => {
    const wrapper = mount(<DcLoads power={98.765} />)

    it("shows empty current", () => {
      expect(wrapper.find("NumericValue").first().props().value).toBeUndefined()
    })
  })

  describe("when values aren't loaded yet", () => {
    const wrapper = mount(<DcLoads />)

    it("doesn't show the widget", () => {
      expect(wrapper.find("NumericValue").length).toEqual(0)
    })
  })
})
