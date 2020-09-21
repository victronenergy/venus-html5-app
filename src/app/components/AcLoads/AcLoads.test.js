import { AcLoads } from "./AcLoads"
import { mount } from "enzyme"
import React from "react"

describe("AC Loads", () => {
  describe("when valid with 3 phases", () => {
    const wrapper = mount(
      <AcLoads phases={3} voltage={[220, 230, 240]} current={[4.1, 7.0, 6.9]} power={[900, 1200, 1400]} />
    )

    it("shows values for all 3 phases", () => {
      const listRows = wrapper.find("ListRow")
      expect(listRows.length).toEqual(3)
    })

    it("shows voltage value", () => {
      const props = wrapper
        .find("NumericValue")
        .first()
        .props()

      expect(props.value).toEqual(220)
    })

    it("shows current values", () => {
      const props = wrapper
        .find("NumericValue")
        .at(1)
        .props()

      expect(props.value).toEqual(4.1)
    })

    it("shows power values", () => {
      const props = wrapper
        .find("NumericValue")
        .at(2)
        .props()

      expect(props.value).toEqual(900)
    })
  })

  describe("when valid with 2 phases", () => {
    const wrapper = mount(<AcLoads phases={3} voltage={[220, 230]} current={[4.1, 7.0]} power={[900, 1200]} />)

    it("shows values for all both phases", () => {
      const listRows = wrapper.find("ListRow")
      expect(listRows.length).toEqual(2)
    })
  })

  describe("when valid with one phases", () => {
    const wrapper = mount(<AcLoads phases={3} voltage={[220]} current={[4.1]} power={[900]} />)

    it("shows values for only one phase", () => {
      const listRows = wrapper.find("ListRow")
      expect(listRows.length).toEqual(1)
    })
  })
})
