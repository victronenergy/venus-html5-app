import { BreakpointStylesType } from "../../../utils/media"

export const Styles: BreakpointStylesType = {
  default: {
    voltage: "hidden",
    name: "text-base",
    state: "text-2xs",
  },
  "xs-xs": {
    voltage: "text-sm",
    batteryState: "text-xs",
    name: "text-base",
    state: "text-xs",
  },
  "sm-s": {
    voltage: "text-base",
    batteryState: "text-sm",
    name: "text-base",
    state: "text-sm",
  },
  "sm-m": {
    voltage: "text-lg",
    batteryState: "text-base",
    name: "text-lg",
    state: "text-base",
  },
}
