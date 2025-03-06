import { BreakpointStylesType } from "../../../utils/media"

export const Styles: BreakpointStylesType = {
  default: {
    value: "text-base",
    title: "text-sm",
    subtitle: "text-xs pb-1",
    icon: "shrink-0 w-[18px]",
    smallIcon: "min-w-3 w-3",
  },
  "sm-s": {
    value: "text-lg",
    title: "text-sm",
    subtitle: "text-sm pb-1",
    icon: "shrink-0 w-[24px]",
    smallIcon: "min-w-5 w-5",
  },
  "sm-m": {
    value: "text-lg",
    title: "text-base",
    subtitle: "text-sm pb-1",
    icon: "shrink-0 w-[32px]",
    smallIcon: "min-w-5 w-5",
  },
  "md-s": {
    value: "text-lg",
    title: "text-base",
    subtitle: "text-sm pb-1",
    icon: "shrink-0 w-[32px]",
    smallIcon: "min-w-5 w-5",
  },
  "md-l": {
    value: "text-lg",
    title: "text-lg",
    subtitle: "text-sm pb-1",
    icon: "shrink-0 w-[32px]",
    smallIcon: "min-w-5 w-5",
  },
}
