import React from "react"
import { mount } from "enzyme"
import LockButton from "./LockButton"

describe("LockButton component", () => {
  describe("when screen is unlocked", () => {
    const lockToggleFunction = jest.fn()
    const wrapper = mount(<LockButton screenLocked={false} onClick={lockToggleFunction} />)

    it("should show 'Lock to prevent changes'", () => {
      expect(wrapper.text()).toContain("Lock to prevent changes")
    })

    it("should lock the screen when pressed", () => {
      wrapper.simulate("click")
      expect(lockToggleFunction).toHaveBeenCalled()
    })
  })

  describe("when screen is locked", () => {
    const lockToggleFunction = jest.fn()
    const wrapper = mount(<LockButton screenLocked={true} onClick={lockToggleFunction} />)

    it("should show 'Unlock to make changes'", () => {
      expect(wrapper.text()).toContain("Unlock to make changes")
    })

    it("should unlock the screen when pressed", () => {
      wrapper.simulate("click")
      expect(lockToggleFunction).toHaveBeenCalled()
    })
  })
})
