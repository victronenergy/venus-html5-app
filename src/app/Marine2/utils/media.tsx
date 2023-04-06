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

export const applyStyles = (size: ComponentSizeType, stylesObject: BreakpointStylesType) => {
  let styles: StylesType = {}

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

  return styles
}
