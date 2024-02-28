import { BreakpointStylesType } from "../../../utils/media"

export const Styles: BreakpointStylesType = {
  default: {
    voltage: "hidden",
    name: "text-base max-w-[20rem]",
    state: "text-2xs",
  },
  "xs-xs": {
    voltage: "text-sm",
    batteryState: "text-xs",
    name: "text-base max-w-[10rem]",
    state: "text-xs",
  },
  "sm-s": {
    voltage: "text-base",
    batteryState: "text-sm",
    name: "text-base max-w-[12rem]",
    state: "text-sm",
  },
  "sm-m": {
    voltage: "text-lg",
    batteryState: "text-base",
    name: "text-lg max-w-[20rem]",
    state: "text-base",
  },
}
