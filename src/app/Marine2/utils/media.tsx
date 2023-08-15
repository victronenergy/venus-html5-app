export type BreakpointStylesType = {
  [key: string]: StylesType
}

export type StylesType = {
  [key: string]: string
}

type ComponentSizeType = {
  width: number
  height: number
}

type BreakpointsType = {
  [key: string]: ComponentSizeType
}

export const defaultBoxBreakpoints: BreakpointsType = {
  small: { width: 250, height: 300 },
  medium: { width: 500, height: 300 },
  large: { width: 800, height: 440 },
}

export const defaultBoxStyles: BreakpointStylesType = {
  small: {
    mainValue: "text-xxl",
    valueSubtitle: "text-sm",
    secondaryValue: "text-base",
    buttons: "text-base",
    icon: "w-[18px]",
  },
  medium: {
    mainValue: "text-2xl",
    valueSubtitle: "text-base",
    secondaryValue: "text-xl",
    buttons: "text-base",
    icon: "w-[24px]",
  },
  large: {
    mainValue: "text-3xl",
    valueSubtitle: "text-base",
    secondaryValue: "text-xxl",
    buttons: "text-base",
    icon: "w-[32px]",
  },
  default: {
    mainValue: "text-xl",
    valueSubtitle: "text-sm",
    secondaryValue: "text-base",
    buttons: "text-base",
    icon: "w-[18px]",
  },
}

export const boxBreakpoints: BreakpointsType = {
  "xs-xs": { width: 200, height: 200 },
  "sm-s": { width: 200, height: 200 },
  "sm-m": { width: 200, height: 300 },
  "sm-l": { width: 200, height: 400 },
  "md-s": { width: 400, height: 200 },
  "md-m": { width: 400, height: 300 },
  "md-l": { width: 400, height: 400 },
  "lg-s": { width: 500, height: 200 },
  "lg-m": { width: 500, height: 300 },
  "lg-l": { width: 500, height: 400 },
}

export const applyStyles = (size: ComponentSizeType, stylesObject: BreakpointStylesType = defaultBoxStyles) => {
  let styles: StylesType = {}
  if (stylesObject === defaultBoxStyles) {
    Object.keys(defaultBoxBreakpoints).forEach((breakpoint) => {
      const breakpointWidth = defaultBoxBreakpoints[breakpoint].width
      const breakpointHeight = defaultBoxBreakpoints[breakpoint].height
      if (size.width >= breakpointWidth && size.height >= breakpointHeight) {
        styles = { ...styles, ...stylesObject[breakpoint] }
      }
    })

    if (Object.keys(styles).length === 0) {
      styles = stylesObject["default"]
    }
  } else {
    Object.keys(boxBreakpoints).forEach((breakpoint) => {
      const breakpointWidth = boxBreakpoints[breakpoint].width
      const breakpointHeight = boxBreakpoints[breakpoint].height
      if (size.width >= breakpointWidth && size.height >= breakpointHeight) {
        styles = { ...styles, ...stylesObject[breakpoint] }
      }
    })

    if (Object.keys(styles).length === 0) {
      styles = stylesObject["default"]
    }
  }
  return styles
}
