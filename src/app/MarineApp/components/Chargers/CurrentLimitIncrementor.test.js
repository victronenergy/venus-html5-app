import CurrentLimitIncrementor from "./CurrentLimitIncrementor"
import { shallow } from "enzyme"
import React from "react"

describe("Input limit spinner", () => {
  describe("when valid", () => {
    const onCurrentLimitChanged = jest.fn()
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<CurrentLimitIncrementor currentLimit={10} onInputLimitChanged={onCurrentLimitChanged} />)
    })

    afterEach(() => {
      onCurrentLimitChanged.mockClear()
    })

    it("shows current limit", () => {
      const limit = wrapper.find(".metric__current-input-limit__limit").text()

      expect(limit).toEqual("10A")
    })

    it("should call prop `onCurrentLimitChanged` with limit increased by 1", () => {
      const plusButton = wrapper.find(".metric__current-input-limit__increment").first()
      plusButton.simulate("click")

      const invocationArgs = onCurrentLimitChanged.mock.calls[0]
      expect(invocationArgs).toEqual([11])
    })

    it("should call prop `onCurrentLimitChanged` with limit decreased by 1", () => {
      const minusButton = wrapper.find(".metric__current-input-limit__decrement").first()
      minusButton.simulate("click")

      const invocationArgs = onCurrentLimitChanged.mock.calls[0]
      expect(invocationArgs).toEqual([9])
    })
  })
})
