import React from "react"
import { mount } from "enzyme"
import SelectorButton from "./SelectorButton"

beforeEach(() => {
  jest.resetModules()
})

const getSelectorButtonWithLockedContext = (context = {}) => {
  jest.doMock("../../contexts", () => {
    return {
      LockContext: {
        Consumer: props => props.children(context)
      }
    }
  })
  require("./SelectorButton").default
}

describe("SelectorButton component", () => {
  it("should be disabled if screenLocked is true in context", () => {
    getSelectorButtonWithLockedContext({ screenLocked: true })
    const SelectorButton = require("./SelectorButton").default
    const wrapper = mount(<SelectorButton alwaysUnlocked={false} />)

    expect(wrapper.find(".selector-button").hasClass("selector-button--disabled")).toEqual(true)
  })

  it("should be disabled if screenLocked is true in context", () => {
    getSelectorButtonWithLockedContext({ screenLocked: false })
    const SelectorButton = require("./SelectorButton").default
    const wrapper = mount(<SelectorButton alwaysUnlocked={false} />)

    expect(wrapper.find(".selector-button").hasClass("selector-button--disabled")).toEqual(false)
  })

  // Test, for example, pagination control buttons
  it("should not be disabled if screenLocked, but has the alwaysUnlocked property", () => {
    getSelectorButtonWithLockedContext({ screenLocked: true })
    const SelectorButton = require("./SelectorButton").default
    const wrapper = mount(<SelectorButton alwaysUnlocked={true} />)

    expect(wrapper.find(".selector-button").hasClass("selector-button--disabled")).toEqual(false)
  })
})
