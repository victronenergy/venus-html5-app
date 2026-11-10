import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { useSwitchableOutput } from "@victronenergy/mfd-modules"
import SteppedSwitchOutput from "./SteppedSwitchOutput"

jest.mock("@victronenergy/mfd-modules", () => ({
  useSwitchableOutput: jest.fn(),
  getSwitchingPaneItemNameForDisplay: () => "Fan",
}))

jest.mock("react-i18nify", () => ({
  translate: (key: string) => key,
}))

const mockUseSize = jest.fn(() => [300, 44])
jest.mock(
  "app/Marine2/utils/hooks/use-size",
  () =>
    (...args: unknown[]) =>
      mockUseSize(...args),
)

const useSwitchableOutputMock = useSwitchableOutput as jest.Mock

const makeOutput = (overrides: Record<string, unknown> = {}) => ({
  state: 1,
  status: 0,
  type: 4,
  dimming: 1,
  dimmingMax: 3,
  labels: undefined,
  updateState: jest.fn(),
  updateDimming: jest.fn(),
  ...overrides,
})

// observer() memoises the component; in the app MobX re-renders it when the store changes. Tests that
// rerender with a new mocked store must vary a prop so React does not skip the render.
let renderTick = 0
const element = () => (
  <SteppedSwitchOutput
    key="k"
    tree="switch"
    deviceId="1"
    outputId="o"
    parentDeviceName="Device"
    className={`tick-${renderTick++}`}
  />
)

const setup = (overrides: Record<string, unknown> = {}) => {
  const switchableOutput = makeOutput(overrides)
  useSwitchableOutputMock.mockReturnValue(switchableOutput)
  const utils = render(element())
  return { switchableOutput, ...utils }
}

// jsdom has no layout; emulate how wide each measurement span's text would be
const mockTextWidths = (widthOf: (text: string) => number, clientWidth = 100) => {
  Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
    configurable: true,
    get() {
      return widthOf(this.textContent ?? "")
    },
  })
  Object.defineProperty(HTMLElement.prototype, "clientWidth", { configurable: true, get: () => clientWidth })
}
const mockOverflow = (overflows: boolean) => mockTextWidths(() => (overflows ? 200 : 50))

const stepButtons = () => screen.getAllByRole("button").slice(1) // first button is On/Off
const stepTexts = () => stepButtons().map((b) => b.textContent)

beforeEach(() => {
  mockUseSize.mockReturnValue([300, 44])
})

afterEach(() => {
  delete (HTMLElement.prototype as any).scrollWidth
  delete (HTMLElement.prototype as any).clientWidth
})

describe("SteppedSwitchOutput", () => {
  test("renders numeric steps when no labels are provided", () => {
    setup()
    expect(stepButtons().map((b) => b.textContent)).toEqual(["1", "2", "3"])
    expect(screen.queryAllByTestId("segments-measure")).toHaveLength(0)
  })

  test("renders numeric steps when labels is not an array", () => {
    setup({ labels: "Low,Med,High" })
    expect(stepButtons().map((b) => b.textContent)).toEqual(["1", "2", "3"])
  })

  test("renders labels indexed by dimming value, translating /keywords", () => {
    setup({ labels: ["/off", "/low", "Med", "/high"] })
    expect(stepButtons().map((b) => b.textContent)).toEqual(["switches.low", "Med", "switches.high"])
  })

  test("falls back to the number for missing or blank labels", () => {
    setup({ labels: ["", "Low", " "] })
    expect(stepButtons().map((b) => b.textContent)).toEqual(["Low", "2", "3"])
  })

  test("falls back to numbers for all steps when a label does not fit", () => {
    mockOverflow(true)
    setup({ labels: ["", "Low", "Medium", "A very long label"] })
    expect(stepButtons().map((b) => b.textContent)).toEqual(["1", "2", "3"])
    // the measurement row keeps carrying the labels so a later resize can re-enable them
    expect(screen.getAllByTestId("segments-measure").map((s) => s.textContent)).toEqual([
      "Low",
      "Medium",
      "A very long label",
    ])
  })

  test("keeps labels when they fit", () => {
    mockOverflow(false)
    setup({ labels: ["", "Low", "Med", "High"] })
    expect(stepButtons().map((b) => b.textContent)).toEqual(["Low", "Med", "High"])
  })

  test("falls back for every step when only one label does not fit (all-or-nothing)", () => {
    mockTextWidths((text) => (text === "A very long label" ? 200 : 50))
    setup({ labels: ["", "Low", "Med", "A very long label"] })
    expect(stepTexts()).toEqual(["1", "2", "3"])
  })

  test("re-measures when the labels change: long, absent, short", () => {
    mockTextWidths((text) => (text.length > 8 ? 200 : 50))
    const { rerender } = setup({ labels: ["", "Economy mode", "Comfort mode", "Boost"] })
    expect(stepTexts()).toEqual(["1", "2", "3"])

    useSwitchableOutputMock.mockReturnValue(makeOutput({ labels: undefined }))
    rerender(element())
    expect(stepTexts()).toEqual(["1", "2", "3"])

    useSwitchableOutputMock.mockReturnValue(makeOutput({ labels: ["", "Low", "Med", "High"] }))
    rerender(element())
    expect(stepTexts()).toEqual(["Low", "Med", "High"])
  })

  test("re-measures when labels with spaces are rearranged at the same width", () => {
    mockTextWidths((text) => (text === "aaaa bbbb" ? 200 : 50))
    const { rerender } = setup({ labels: ["", "aaaa bbbb", "c", "d"] })
    expect(stepTexts()).toEqual(["1", "2", "3"])

    useSwitchableOutputMock.mockReturnValue(makeOutput({ labels: ["", "aaaa", "bbbb c", "d"] }))
    rerender(element())
    expect(stepTexts()).toEqual(["aaaa", "bbbb c", "d"])
  })

  test("re-measures when the available width changes", () => {
    let available = 100
    mockTextWidths(() => 80, 0)
    Object.defineProperty(HTMLElement.prototype, "clientWidth", { configurable: true, get: () => available })
    const { rerender } = setup({ labels: ["", "Low", "Med", "High"] })
    expect(stepTexts()).toEqual(["Low", "Med", "High"])

    available = 60
    mockUseSize.mockReturnValue([180, 44])
    rerender(element())
    expect(stepTexts()).toEqual(["1", "2", "3"])

    available = 100
    mockUseSize.mockReturnValue([300, 44])
    rerender(element())
    expect(stepTexts()).toEqual(["Low", "Med", "High"])
  })

  test("highlights the selected step also when dimming arrives as a string", () => {
    setup({ dimming: "2", labels: ["", "Low", "Med", "High"] })
    const selected = stepButtons().filter((b) => b.className.includes("bg-content-victronBlue"))
    expect(selected.map((b) => b.textContent)).toEqual(["Med"])
  })

  test("renders a single step when dimmingMax is missing", () => {
    setup({ dimmingMax: undefined, labels: ["", "Only"] })
    expect(stepTexts()).toEqual(["Only"])
  })

  test("writes the dimming value of the clicked step when on", () => {
    const { switchableOutput: output } = setup({ labels: ["", "Low", "Med", "High"] })
    fireEvent.click(screen.getByRole("button", { name: "Med" }))
    expect(output.updateDimming).toHaveBeenCalledWith(2)
  })

  test("ignores step clicks when off", () => {
    const { switchableOutput: output } = setup({ state: 0, labels: ["", "Low", "Med", "High"] })
    fireEvent.click(screen.getByRole("button", { name: "Med" }))
    expect(output.updateDimming).not.toHaveBeenCalled()
  })

  test("keeps the On/Off toggle when the off state is not named", () => {
    const { switchableOutput: output } = setup({ labels: ["", "Low", "Med", "High"] })
    expect(screen.getAllByRole("button")[0].textContent).toBe("switches.on")
    fireEvent.click(screen.getAllByRole("button")[0])
    expect(output.updateState).toHaveBeenCalledWith(0)
  })

  test("keeps the dimmed preselected step while off when the off state is not named", () => {
    setup({ state: 0, dimming: 2, labels: ["", "Low", "Med", "High"] })
    expect(screen.getAllByRole("button")[0].textContent).toBe("switches.off")
    const dimmed = stepButtons().filter((b) => b.className.includes("bg-content-victronBlue50"))
    expect(dimmed.map((b) => b.textContent)).toEqual(["Med"])
  })

  describe("exclusive off (labels[0] names the off state)", () => {
    const offButton = () => screen.getAllByRole("button")[0]
    const highlighted = () =>
      screen
        .getAllByRole("button")
        .filter((b) => b.className.includes("bg-content-victronBlue"))
        .map((b) => b.textContent)

    test("shows the translated off label and highlights only it, in the off colour, while off", () => {
      setup({ state: 0, dimming: 2, labels: ["/off", "Eco", "High", "Boost"] })
      expect(offButton().textContent).toBe("switches.off")
      expect(highlighted()).toEqual(["switches.off"])
      expect(offButton().className).toContain("bg-content-victronBlue50")
      expect(offButton().className).not.toMatch(/bg-content-victronBlue(?!50)/)
    })

    test("keeps the off label and highlights only the active step while on", () => {
      setup({ state: 1, dimming: 2, labels: ["Standby", "Eco", "High", "Boost"] })
      expect(offButton().textContent).toBe("Standby")
      expect(highlighted()).toEqual(["High"])
    })

    test("tapping the off segment switches off, and does nothing when already off", () => {
      const { switchableOutput: on } = setup({ state: 1, labels: ["/off", "Eco", "High", "Boost"] })
      fireEvent.click(offButton())
      expect(on.updateState).toHaveBeenCalledWith(0)

      const { switchableOutput: off } = setup({ state: 0, labels: ["/off", "Eco", "High", "Boost"] })
      fireEvent.click(screen.getAllByRole("button").filter((b) => b.textContent === "switches.off")[1])
      expect(off.updateState).not.toHaveBeenCalled()
    })

    test("tapping a step while off selects it and switches on", () => {
      const { switchableOutput: output } = setup({ state: 0, labels: ["/off", "Eco", "High", "Boost"] })
      fireEvent.click(screen.getByRole("button", { name: "High" }))
      expect(output.updateDimming).toHaveBeenCalledWith(2)
      expect(output.updateState).toHaveBeenCalledWith(1)
      expect(output.updateDimming.mock.invocationCallOrder[0]).toBeLessThan(
        output.updateState.mock.invocationCallOrder[0],
      )
    })

    test("tapping a step while on only changes the level", () => {
      const { switchableOutput: output } = setup({ state: 1, labels: ["/off", "Eco", "High", "Boost"] })
      fireEvent.click(screen.getByRole("button", { name: "Boost" }))
      expect(output.updateDimming).toHaveBeenCalledWith(3)
      expect(output.updateState).not.toHaveBeenCalled()
    })

    test("lays the off segment out as one equal segment without a separator", () => {
      setup({ state: 0, labels: ["/off", "Eco", "High", "Boost"] })
      expect(screen.queryByTestId("stepped-switch-separator")).toBeNull()
      const offWrapper = offButton().parentElement as HTMLElement
      const stepArea = stepButtons()[0].parentElement as HTMLElement
      expect(offWrapper.style.flex).toBe("1 1 0%")
      expect(stepArea.style.flex).toBe("3 1 0%")
    })

    test("keeps the separator and the narrow toggle when the off state is not named", () => {
      setup({ state: 0, labels: ["", "Eco", "High", "Boost"] })
      expect(screen.getByTestId("stepped-switch-separator")).toBeTruthy()
      expect((offButton().parentElement as HTMLElement).style.flex).toBe("")
    })

    test("step labels that do not fit still fall back to numbers, the off label stays", () => {
      mockTextWidths((text) => (text === "A very long label" ? 200 : 50))
      setup({ state: 1, labels: ["/off", "Eco", "High", "A very long label"] })
      expect(offButton().textContent).toBe("switches.off")
      expect(stepTexts()).toEqual(["1", "2", "3"])
    })
  })
})
