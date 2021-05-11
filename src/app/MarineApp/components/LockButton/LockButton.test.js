import React from "react"
import { mount } from "enzyme"

import LockButton from "./LockButton"
import { LockContext } from "../../../contexts"
import { VIEWS } from "../../../utils/constants"

describe("LockButton component", () => {
  const mockToggleLocked = jest.fn()

  describe("when screen is unlocked", () => {
    const wrapper = mount(
      <LockContext.Provider
        value={{
          screenLocked: false,
          toggleLocked: mockToggleLocked,
        }}
      >
        <LockButton currentView={VIEWS.METRICS} header={true} />
      </LockContext.Provider>
    )

    it("should show 'Lock to prevent changes'", () => {
      expect(wrapper.text()).toContain("Lock to prevent changes")
    })

    it("should call the LockContext's screenlock toggle function when clicked", () => {
      wrapper.find("div.lock-button").simulate("click")
      expect(mockToggleLocked).toHaveBeenCalled()
    })
  })

  describe("when screen is locked", () => {
    const wrapper = mount(
      <LockContext.Provider
        value={{
          screenLocked: true,
          toggleLocked: () => {},
        }}
      >
        <LockButton currentView={VIEWS.METRICS} header={true} />
      </LockContext.Provider>
    )

    it("should show 'Unlock to make changes'", () => {
      expect(wrapper.text()).toContain("Unlock to make changes")
    })

    it("should call the LockContext's screenlock toggle function when clicked", () => {
      wrapper.find("div.lock-button").simulate("click")
      expect(mockToggleLocked).toHaveBeenCalled()
    })
  })
})
