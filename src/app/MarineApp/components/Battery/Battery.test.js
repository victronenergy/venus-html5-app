import { mount } from "enzyme"
import React from "react"
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
    const wrapper = mount(<Batteries batteries={batteries.slice(0, 3)} />)

    it("should show batteries", () => {
      expect(wrapper.find(".battery").length).toBe(3)
    })

    it("should not show pagination", () => {
      expect(wrapper.find(".battery__paginator").exists()).toBe(false)
    })
  })

  describe("with more than 1 page of batteries", () => {
    const wrapper = mount(<Batteries batteries={batteries} />)

    it("page should show one page of batteries", () => {
      expect(wrapper.find(".battery").length).toBe(3)
    })

    it("should show pagination", () => {
      expect(wrapper.find(".battery__paginator").exists()).toBe(true)
    })

    it("should have 'filler' elements on the last page", () => {
      const paginatorLabel = wrapper.find(".battery__paginator-page")
      const nextPage = wrapper.find(".selector-button").last()

      expect(paginatorLabel.text()).toBe("1")
      nextPage.simulate("click")
      nextPage.simulate("click")
      expect(paginatorLabel.text()).toBe("3")

      expect(wrapper.find(".battery--dummy").length).toBe(2)
    })
  })
})
