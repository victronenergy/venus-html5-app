import { BreakpointStylesType } from "../../../../utils/media"

// styles for compact mode
export const compactStyles: BreakpointStylesType = {
  default: {
    tankName: "text-sm ",
    level: "text-base min-w-[38px]",
    icon: "shrink-0 w-[18px]",
  },
  "sm-s": {
    tankName: "text-sm ",
    level: "text-base min-w-[38px]",
    icon: "shrink-0 w-[24px]",
  },
  "sm-m": {
    tankName: "text-base min-w-[2rem]",
    level: "text-base min-w-[38px]",
    icon: "shrink-0 w-[32px]",
  },
  "md-s": {
    tankName: "text-base",
    level: "text-lg min-w-[3rem]",
    icon: "shrink-0 w-[32px]",
  },
  "md-l": {
    tankName: "text-lg",
    level: "text-lg min-w-[3rem]",
    icon: "shrink-0 w-[32px]",
  },
}

// styles for horizontal orientation
export const horizontalStyles: BreakpointStylesType = {
  default: {
    tankName: "text-sm",
    level: "text-base",
    capacity: "text-xs",
  },
  "sm-s": {
    tankName: "text-md",
    level: "text-lg",
    capacity: "text-sm",
  },
  "md-s": {
    tankName: "text-md",
    level: "text-xl",
    capacity: "text-sm",
  },
}

// styles for vertical orientation
export const verticalStyles: BreakpointStylesType = {
  default: {
    tankName: "text-base mr-5",
    level: "text-lg min-w-[3rem]",
    capacity: "text-xs",
  },
  "sm-s": {
    tankName: "text-base mr-5",
    level: "text-lg min-w-[3rem]",
    capacity: "text-xs",
  },
  "md-s": {
    tankName: "text-lg mr-5",
    level: "text-xl min-w-[3.8rem]",
    capacity: "text-xs",
  },
  "lg-s": {
    tankName: "text-lg mr-5",
    level: "text-xl min-w-[3.8rem]",
    capacity: "text-xs",
  },
}
