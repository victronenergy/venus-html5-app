import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { useSwitchableOutput } from "@victronenergy/mfd-modules"
import DropdownOutput from "./DropdownOutput"

jest.mock("@victronenergy/mfd-modules", () => ({
  useSwitchableOutput: jest.fn(),
  getSwitchingPaneItemNameForDisplay: () => "Mode",
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
  status: 0,
  type: 6,
  dimming: 1,
  labels: ["Vent", "Cool", "Hot", "Auto"],
  updateDimming: jest.fn(),
  ...overrides,
})

let renderTick = 0
const element = () => (
  <DropdownOutput
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

const segments = () => screen.queryByTestId("dropdown-segments")
// text queries must skip the invisible measurement row
const visibleText = (text: string) => screen.getByText(text, { ignore: '[aria-hidden="true"] *' })
const segmentTexts = () => screen.getAllByRole("button").map((b) => b.textContent)
const highlighted = () =>
  screen
    .getAllByRole("button")
    .filter((b) => b.className.includes("bg-content-victronBlue"))
    .map((b) => b.textContent)

beforeEach(() => {
  mockUseSize.mockReturnValue([300, 44])
})

afterEach(() => {
  delete (HTMLElement.prototype as any).scrollWidth
  delete (HTMLElement.prototype as any).clientWidth
})

describe("DropdownOutput", () => {
  test("shows a few short options as segments with the selected one highlighted", () => {
    setup()
    expect(segments()).toBeTruthy()
    expect(segmentTexts()).toEqual(["Vent", "Cool", "Hot", "Auto"])
    expect(highlighted()).toEqual(["Cool"])
  })

  test("tapping a segment writes its index to dimming", () => {
    const { switchableOutput } = setup()
    fireEvent.click(screen.getByRole("button", { name: "Hot" }))
    expect(switchableOutput.updateDimming).toHaveBeenCalledWith(2)
  })

  test("translates reserved labels and tints a first /off option in the off colour", () => {
    setup({ dimming: 0, labels: ["/off", "/low", "Mid", "/high"] })
    expect(segmentTexts()).toEqual(["switches.off", "switches.low", "Mid", "switches.high"])
    const off = screen.getByRole("button", { name: "switches.off" })
    expect(off.className).toContain("bg-content-victronBlue50")
    expect(off.className).not.toMatch(/bg-content-victronBlue(?!50)/)
  })

  test("a selected option other than /off uses the active colour", () => {
    setup({ dimming: 2, labels: ["/off", "Low", "Mid", "High"] })
    const mid = screen.getByRole("button", { name: "Mid" })
    expect(mid.className).toMatch(/bg-content-victronBlue(?!50)/)
  })

  test("shows the dropdown list for more than five options", () => {
    setup({ labels: ["A", "B", "C", "D", "E", "F"] })
    expect(segments()).toBeNull()
    expect(screen.queryAllByRole("button")).toHaveLength(0)
    expect(visibleText("B")).toBeTruthy() // selected option (dimming 1)
  })

  test("shows the dropdown list when a label does not fit, and the list opens on click", () => {
    mockTextWidths((text) => (text === "Automatic climate" ? 200 : 50))
    const { switchableOutput } = setup({ labels: ["Vent", "Cool", "Automatic climate"] })
    expect(segments()).toBeNull()
    expect(visibleText("Cool")).toBeTruthy()

    fireEvent.click(visibleText("Cool"))
    fireEvent.click(visibleText("Automatic climate"))
    expect(switchableOutput.updateDimming).toHaveBeenCalledWith(2)
  })

  test("switches between list and segments when the labels change", () => {
    mockTextWidths((text) => (text.length > 8 ? 200 : 50))
    const { rerender } = setup({ labels: ["Vent", "Cool", "Automatic climate"] })
    expect(segments()).toBeNull()

    useSwitchableOutputMock.mockReturnValue(makeOutput({ labels: ["Vent", "Cool", "Auto"] }))
    rerender(element())
    expect(segments()).toBeTruthy()
    expect(segmentTexts()).toEqual(["Vent", "Cool", "Auto"])
  })

  test("switches to the list when the available width shrinks", () => {
    let available = 100
    mockTextWidths(() => 80, 0)
    Object.defineProperty(HTMLElement.prototype, "clientWidth", { configurable: true, get: () => available })
    const { rerender } = setup()
    expect(segments()).toBeTruthy()

    available = 60
    mockUseSize.mockReturnValue([180, 44])
    rerender(element())
    expect(segments()).toBeNull()
  })

  test("shows the list when there are no labels", () => {
    setup({ labels: undefined })
    expect(segments()).toBeNull()
  })

  test("segments exactly five options, and a single one", () => {
    setup({ labels: ["A", "B", "C", "D", "E"] })
    expect(segmentTexts()).toEqual(["A", "B", "C", "D", "E"])
    useSwitchableOutputMock.mockReturnValue(makeOutput({ dimming: 0, labels: ["Only"] }))
    render(element())
    expect(screen.getByRole("button", { name: "Only" }).className).toMatch(/bg-content-victronBlue(?!50)/)
  })

  test("shows the list when an option is blank", () => {
    setup({ labels: ["Vent", " ", "Auto"] })
    expect(segments()).toBeNull()
  })

  test("highlights nothing for a missing or out-of-range dimming value", () => {
    setup({ dimming: undefined })
    expect(highlighted()).toEqual([])
    useSwitchableOutputMock.mockReturnValue(makeOutput({ dimming: 9 }))
    render(element())
    expect(highlighted()).toEqual([])
  })

  test("disabled: grey segments that cannot be operated, not even by keyboard", () => {
    const { switchableOutput } = setup({ status: 0x20 })
    const cool = screen.getByRole("button", { name: "Cool" })
    expect(cool.className).toContain("bg-content-victronGray50")
    expect(cool).toBeDisabled()
    fireEvent.click(screen.getByRole("button", { name: "Hot" }))
    expect(switchableOutput.updateDimming).not.toHaveBeenCalled()
  })

  test("closes the list when the options become segments, and keeps it closed when they stop fitting again", () => {
    mockTextWidths((text) => (text.length > 8 ? 200 : 50))
    const { rerender } = setup({ labels: ["Vent", "Cool", "Automatic climate"] })
    fireEvent.click(visibleText("Cool"))
    expect(visibleText("Automatic climate")).toBeTruthy() // list open

    useSwitchableOutputMock.mockReturnValue(makeOutput({ labels: ["Vent", "Cool", "Auto"] }))
    rerender(element())
    expect(segments()).toBeTruthy()

    useSwitchableOutputMock.mockReturnValue(makeOutput({ labels: ["Vent", "Cool", "Automatic climate"] }))
    rerender(element())
    expect(segments()).toBeNull()
    expect(screen.queryAllByText("Vent", { ignore: '[aria-hidden="true"] *' })).toHaveLength(0) // list closed
  })
})
