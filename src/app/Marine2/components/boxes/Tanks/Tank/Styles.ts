import { BreakpointStylesType } from "../../../../utils/media"

// styles for compact mode
export const compactStyles: BreakpointStylesType = {
  default: {
    tankName: "ml-1 text-sm ",
    level: "text-base min-w-[38px]",
    icon: "w-[18px]",
    iconContainer: "w-[10rem]",
    progressBar: "hidden",
    percentage: "w-[4rem]",
  },
  "sm-s": {
    tankName: "ml-1 text-sm ",
    level: "text-base min-w-[38px]",
    icon: "w-[24px]",
    iconContainer: "w-[14rem]",
    progressBar: "hidden",
    percentage: "w-[4rem]",
  },
  "sm-m": {
    tankName: "ml-1 text-base",
    level: "text-base min-w-[38px]",
    icon: "w-[32px]",
    iconContainer: "w-[14rem]",
    progressBar: "hidden",
    percentage: "w-[4rem]",
  },
  "md-s": {
    tankName: "ml-1 text-base",
    level: "text-lg min-w-[3rem]",
    icon: "w-[24px]",
    iconContainer: "w-[12rem]",
    progressBar: "w-[calc(100%-16rem)]",
    percentage: "w-[4rem]",
  },
  "lg-s": {
    tankName: "ml-2 text-lg",
    level: "text-lg min-w-[3rem]",
    icon: "w-[32px]",
    iconContainer: "w-[15rem]",
    progressBar: "w-[calc(100%-19rem)]",
    percentage: "w-[4rem]",
  },
  "md-l": {
    tankName: "ml-2 text-lg",
    level: "text-lg min-w-[3rem]",
    icon: "w-[32px]",
    iconContainer: "w-[16rem]",
    progressBar: "hidden",
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
