import { BreakpointStylesType } from "../../../../utils/media"

// styles for compact mode
export const compactStyles: BreakpointStylesType = {
  default: {
    tankName: "text-sm ",
    level: "text-base min-w-[38px]",
    icon: "w-[18px]",
    iconContainer: "w-[10rem]",
    progressBar: "w-[calc(100%-14rem)]",
    percentage: "w-[4rem]",
  },
  "sm-s": {
    tankName: "text-sm ",
    level: "text-base min-w-[38px]",
    icon: "w-[24px]",
    iconContainer: "w-[5rem]",
    progressBar: "hidden",
    percentage: "w-[4rem]",
  },
  "sm-m": {
    tankName: "text-base min-w-[2rem]",
    level: "text-base min-w-[38px]",
    icon: "w-[32px]",
    iconContainer: "w-[10rem]",
    progressBar: "hidden",
    percentage: "w-[4rem]",
  },
  "md-s": {
    tankName: "text-base",
    level: "text-lg min-w-[3rem]",
    icon: "w-[32px]",
    iconContainer: "w-[5rem]",
    progressBar: "w-[calc(100%-9rem)]",
    percentage: "w-[4rem]",
  },
  "md-l": {
    tankName: "text-lg",
    level: "text-lg min-w-[3rem]",
    icon: "w-[32px]",
    iconContainer: "w-[10rem]",
    progressBar: "w-[calc(100%-14rem)]",
    percentage: "w-[4rem]",
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
