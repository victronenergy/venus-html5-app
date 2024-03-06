import { BreakpointStylesType } from "../../../../utils/media"

// styles for compact mode
export const compactStyles: BreakpointStylesType = {
  default: {
    tankName: " text-sm ",
    level: "text-base ",
    icon: "w-[18px] mr-1",
    iconContainer: "w-px",
    progressBar: "mx-4 block",
    percentage: "w-px",
  },
  "sm-s": {
    tankName: " text-sm ",
    level: "text-base ",
    icon: "w-[24px] mr-1",
    iconContainer: "w-px",
    progressBar: "mx-4 hidden",
    percentage: "w-px",
  },
  "sm-m": {
    tankName: " text-base",
    level: "text-base ",
    icon: "w-[32px] mr-1",
    iconContainer: "w-px",
    progressBar: "mx-4 block",
    percentage: "w-px",
  },
  "md-s": {
    tankName: " text-base",
    level: "text-lg ",
    icon: "w-[24px] mr-1",
    iconContainer: "w-px",
    progressBar: "mx-4 block",
    percentage: "w-px",
  },
  "lg-s": {
    tankName: "text-lg",
    level: "text-lg ",
    icon: "w-[32px] mr-2",
    iconContainer: "w-px",
    progressBar: "mx-4 block",
    percentage: "w-px",
  },
  "md-l": {
    tankName: "text-lg",
    level: "text-lg ",
    icon: "w-[32px] mr-2",
    iconContainer: "w-px",
    progressBar: "mx-4 block",
    percentage: "w-px",
  },
}

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
