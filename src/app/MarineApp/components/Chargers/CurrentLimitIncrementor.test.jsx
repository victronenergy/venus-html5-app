import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import CurrentLimitIncrementor from "./CurrentLimitIncrementor"

describe("Input limit spinner", () => {
  describe("when valid", () => {
    const onCurrentLimitChanged = jest.fn()

    beforeEach(() => {
      render(<CurrentLimitIncrementor currentLimit={10} onInputLimitChanged={onCurrentLimitChanged} />)
    })

    afterEach(() => {
      onCurrentLimitChanged.mockClear()
    })

    it("shows current limit", () => {
      expect(screen.getByText("10A")).toBeInTheDocument()
    })

    it("should call prop `onCurrentLimitChanged` with limit increased by 1", () => {
      const plusButton = document.querySelector(".metric__current-input-limit__increment")
      fireEvent.click(plusButton)
      expect(onCurrentLimitChanged).toHaveBeenCalledWith(11)
    })

    it("should call prop `onCurrentLimitChanged` with limit decreased by 1", () => {
      const minusButton = document.querySelector(".metric__current-input-limit__decrement")
      fireEvent.click(minusButton)
      expect(onCurrentLimitChanged).toHaveBeenCalledWith(9)
    })
  })
})
