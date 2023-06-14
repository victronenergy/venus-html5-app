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
  },
  medium: {
    mainValue: "text-2xl",
    valueSubtitle: "text-base",
    secondaryValue: "text-xl",
    buttons: "text-base",
  },
  large: {
    mainValue: "text-3xl",
    valueSubtitle: "text-base",
    secondaryValue: "text-xxl",
    buttons: "text-base",
  },
  default: {
    mainValue: "text-xl",
    valueSubtitle: "text-sm",
    secondaryValue: "text-base",
    buttons: "text-base",
  },
}

export const boxBreakpoints: BreakpointsType = {
  "xs-xs": { width: 200, height: 200 },
  "sm-s": { width: 200, height: 300 },
  "sm-m": { width: 200, height: 450 },
  "sm-l": { width: 200, height: 600 },
  "md-s": { width: 400, height: 300 },
  "md-m": { width: 400, height: 450 },
  "md-l": { width: 400, height: 600 },
  "lg-s": { width: 600, height: 300 },
  "lg-m": { width: 600, height: 450 },
  "lg-l": { width: 600, height: 600 },
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
