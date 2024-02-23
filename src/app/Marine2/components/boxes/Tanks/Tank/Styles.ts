import { BreakpointStylesType } from "../../../../utils/media"

// styles for compact mode
export const compactStyles: BreakpointStylesType = {
  default: {
    tankName: "text-sm ",
    level: "text-base min-w-[38px]",
    icon: "shrink-0 w-[18px]",
    iconContainer: "w-[10rem]",
    progressBar: "w-[calc(100%-14rem)]",
    percentage: "w-[4rem]",
  },
  "sm-s": {
    tankName: "text-sm ",
    level: "text-base min-w-[38px]",
    icon: "shrink-0 w-[24px]",
    iconContainer: "w-[5rem]",
    progressBar: "hidden",
    percentage: "w-[4rem]",
  },
  "sm-m": {
    tankName: "text-base min-w-[2rem]",
    level: "text-base min-w-[38px]",
    icon: "shrink-0 w-[32px]",
    iconContainer: "w-[10rem]",
    progressBar: "hidden",
    percentage: "w-[4rem]",
  },
  "md-s": {
    tankName: "text-base",
    level: "text-lg min-w-[3rem]",
    icon: "shrink-0 w-[32px]",
    iconContainer: "w-[5rem]",
    progressBar: "w-[calc(100%-9rem)]",
    percentage: "w-[4rem]",
  },
  "md-l": {
    tankName: "text-lg",
    level: "text-lg min-w-[3rem]",
    icon: "shrink-0 w-[32px]",
    iconContainer: "w-[10rem]",
    progressBar: "w-[calc(100%-14rem)]",
    percentage: "w-[4rem]",
  },
}

export const verticalStyles: BreakpointStylesType = {
  default: {
    tankName: "text-base",
    level: "text-lg min-w-[3rem]",
    capacity: "text-xs",
    iconContainer: "w-[17rem]",
    progressBar: "w-[calc(100%-22rem)]",
    percentage: "w-[5rem]",
  },
  "sm-s": {
    tankName: "text-base",
    level: "text-lg min-w-[3rem]",
    capacity: "text-xs",
    iconContainer: "w-[10rem]",
    progressBar: "hidden",
    percentage: "w-[5rem]",
  },
  "md-s": {
    tankName: "text-lg",
    level: "text-xl min-w-[3.8rem]",
    capacity: "text-xs",
    iconContainer: "w-[12rem]",
    progressBar: "hidden",
    percentage: "w-[5rem]",
  },
  "lg-s": {
    tankName: "text-lg",
    level: "text-xl min-w-[3.8rem]",
    capacity: "text-xs",
    iconContainer: "w-[12rem]",
    progressBar: "w-[calc(100%-17rem)]",
    percentage: "w-[5rem]",
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
