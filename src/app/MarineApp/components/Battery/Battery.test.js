import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { Batteries } from "./Battery"

const batteries = [
  {
    current: 1.10000002384,
    name: "Skylla-i 24/100 (3) #0",
    voltage: 26.4200000763,
    active_battery_service: false,
    id: "com.victronenergy.charger.socketcan_can0_di10_uc15639:0",
  },
  {
    current: 0,
    name: "Skylla-i 24/100 (3) #1",
    id: "com.victronenergy.charger.socketcan_can0_di10_uc15639:1",
    active_battery_service: false,
    voltage: 26.4200000763,
  },
  {
    current: 1,
    id: "com.victronenergy.charger.socketcan_can0_di10_uc15639:2",
    voltage: 26.4300003052,
    active_battery_service: false,
    name: "Skylla-i 24/100 (3) #2",
  },
  {
    soc: 100,
    active_battery_service: true,
    temperature: 30,
    power: 261.213989258,
    current: 8.10000038147,
    instance: 256,
    state: 1,
    voltage: 26.9399986267,
    id: "com.victronenergy.battery.ttyO0",
    name: "BMV-700",
  },
  {
    current: 1.10000002384,
    voltage: 26.3899993896,
    name: "Skylla-i 24/100 (3) #0",
    active_battery_service: false,
    id: "com.victronenergy.charger.socketcan_can0_di2_uc15644:0",
  },
  {
    current: 0,
    name: "Skylla-i 24/100 (3) #1",
    voltage: 26.3200000763,
    active_battery_service: false,
    id: "com.victronenergy.charger.socketcan_can0_di2_uc15644:1",
  },
  {
    current: 1,
    voltage: 26.3300003052,
    id: "com.victronenergy.charger.socketcan_can0_di2_uc15644:2",
    active_battery_service: false,
    name: "Skylla-i 24/100 (3) #2",
  },
]

describe("Battery element", () => {
  describe("with a few batteries", () => {
    it("should show batteries", () => {
      const { container } = render(<Batteries batteries={batteries.slice(0, 3)} />)
      expect(container.querySelectorAll(".battery").length).toBe(3)
    })

    it("should not show pagination", () => {
      const { container } = render(<Batteries batteries={batteries.slice(0, 3)} />)
      expect(container.querySelector(".battery__paginator")).toBeNull()
    })
  })

  describe("with more than 1 page of batteries", () => {
    it("page should show one page of batteries", () => {
      const { container } = render(<Batteries batteries={batteries} />)
      expect(container.querySelectorAll(".battery").length).toBe(3)
    })

    it("should show pagination", () => {
      const { container } = render(<Batteries batteries={batteries} />)
      expect(container.querySelector(".battery__paginator")).toBeInTheDocument()
    })

    it("should have 'filler' elements on the last page", () => {
      const { container } = render(<Batteries batteries={batteries} />)
      const paginatorLabel = container.querySelector(".battery__paginator-page")
      const nextButtons = container.querySelectorAll(".selector-button")
      const nextPage = nextButtons[nextButtons.length - 1]

      expect(paginatorLabel.textContent).toBe("1")
      fireEvent.click(nextPage)
      fireEvent.click(nextPage)
      expect(paginatorLabel.textContent).toBe("3")

      expect(container.querySelectorAll(".battery--dummy").length).toBe(2)
    })
  })
})
