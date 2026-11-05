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
    expect(screen.queryAllByTestId("stepped-switch-measure")).toHaveLength(0)
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
    expect(screen.getAllByTestId("stepped-switch-measure").map((s) => s.textContent)).toEqual([
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

  test("keeps the hardcoded On/Off toggle", () => {
    const { switchableOutput: output } = setup({ labels: ["Custom off", "Low", "Med", "High"] })
    expect(screen.getAllByRole("button")[0].textContent).toBe("switches.on")
    fireEvent.click(screen.getAllByRole("button")[0])
    expect(output.updateState).toHaveBeenCalledWith(0)
  })
})
