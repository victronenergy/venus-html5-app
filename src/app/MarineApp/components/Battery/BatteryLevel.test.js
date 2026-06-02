import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { BatteryLevel } from "./BatteryLevel"
import { BATTERY_STATE } from "../../../utils/constants"

describe("Battery level", () => {
  describe("when battery is charging", () => {
    it("should show battery level", async () => {
      const { container } = render(
        <BatteryLevel battery={{ state: BATTERY_STATE.CHARGING, soc: 95, timetogo: 9000 }} />,
      )
      await waitFor(() => {
        expect(container.textContent).toContain("95")
        expect(container.textContent).toContain("%")
      })
    })

    it("should show charging", async () => {
      render(<BatteryLevel battery={{ state: BATTERY_STATE.CHARGING, soc: 95, timetogo: 9000 }} />)
      await waitFor(() => expect(screen.getByText("charging")).toBeInTheDocument())
    })

    it("should NOT show time to go", async () => {
      const { container } = render(
        <BatteryLevel battery={{ state: BATTERY_STATE.CHARGING, soc: 95, timetogo: 9000 }} />,
      )
      await waitFor(() => expect(container.textContent).not.toContain("2h 30m"))
    })
  })

  describe("when battery is discharging", () => {
    it("should show battery level", async () => {
      const { container } = render(
        <BatteryLevel battery={{ state: BATTERY_STATE.DISCHARGING, soc: 95, timetogo: 9000 }} />,
      )
      await waitFor(() => {
        expect(container.textContent).toContain("95")
        expect(container.textContent).toContain("%")
      })
    })

    it("should show discharging", async () => {
      render(<BatteryLevel battery={{ state: BATTERY_STATE.DISCHARGING, soc: 95, timetogo: 9000 }} />)
      await waitFor(() => expect(screen.getByText("discharging")).toBeInTheDocument())
    })

    it("should show time to go", async () => {
      const { container } = render(
        <BatteryLevel battery={{ state: BATTERY_STATE.DISCHARGING, soc: 95, timetogo: 9000 }} />,
      )
      await waitFor(() => expect(container.textContent).toContain("2 hours"))
    })
  })

  describe("when battery is idle", () => {
    it("should show battery level", async () => {
      const { container } = render(
        <BatteryLevel battery={{ state: BATTERY_STATE.IDLE, soc: 95, timetogo: 9000 }} />,
      )
      await waitFor(() => {
        expect(container.textContent).toContain("95")
        expect(container.textContent).toContain("%")
      })
    })

    it("should show idle", async () => {
      render(<BatteryLevel battery={{ state: BATTERY_STATE.IDLE, soc: 95, timetogo: 9000 }} />)
      await waitFor(() => expect(screen.getByText("idle")).toBeInTheDocument())
    })

    it("should NOT show time to go", async () => {
      const { container } = render(
        <BatteryLevel battery={{ state: BATTERY_STATE.IDLE, soc: 95, timetogo: 9000 }} />,
      )
      await waitFor(() => expect(container.textContent).not.toContain("2h 30m"))
    })
  })
})
