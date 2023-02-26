export type StylesType = {
  [key: string]: {
    [key: string]: string
  }
}

type ComponentSizeType = {
  width: number
  height: number
}

type BreakpointsType = {
  [key: string]: ComponentSizeType
}

const boxBreakpoints: BreakpointsType = {
  "sm-s": { width: 200, height: 200 },
  "sm-m": { width: 200, height: 450 },
  "sm-l": { width: 200, height: 600 },
  "md-s": { width: 400, height: 200 },
  "md-m": { width: 400, height: 450 },
  "md-l": { width: 400, height: 600 },
  "lg-s": { width: 600, height: 200 },
  "lg-m": { width: 600, height: 450 },
  "lg-l": { width: 600, height: 600 },
}

export const applyStyles = (size: ComponentSizeType, stylesObject: StylesType) => {
  let styles = {}

  Object.keys(boxBreakpoints).forEach((breakpoint) => {
    const breakpointWidth = boxBreakpoints[breakpoint].width
    const breakpointHeight = boxBreakpoints[breakpoint].height
    if (size.width >= breakpointWidth && size.height >= breakpointHeight) {
      styles = { ...styles, ...stylesObject[breakpoint] }
    }
  })
  return styles
}
