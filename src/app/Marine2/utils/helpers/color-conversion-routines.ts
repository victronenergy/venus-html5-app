export function colorHueToDisplayColor(h: number, s: number, v: number): string {
  s = s / 100
  v = v / 100

  const l = v * (1 - s / 2)
  const sHsl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l)

  return `hsl(${h}, ${Math.round(sHsl * 100)}%, ${Math.round(l * 100)}%)`
}

interface RGB {
  r: number
  g: number
  b: number
}

function findColorBetween(color1: RGB, color2: RGB, pos: number): RGB {
  const r = color1.r + (color2.r - color1.r) * pos
  const g = color1.g + (color2.g - color1.g) * pos
  const b = color1.b + (color2.b - color1.b) * pos
  return { r, g, b }
}

const warmTemperature = 2000
const coolTemperature = 6500
const warmColor: RGB = { r: 0xff, g: 0xb0, b: 0x55 } // #FFB055 orange
const coolColor: RGB = { r: 0x51, g: 0xa6, b: 0xff } // #51A6FF light blue
const white: RGB = { r: 255, g: 255, b: 255 }

export function colorTemperatureToDisplayColor(colorTemperature: number): string {
  const temperatureRange = coolTemperature - warmTemperature
  const clampedTemperature = Math.min(coolTemperature, Math.max(warmTemperature, colorTemperature))
  const pos = (clampedTemperature - warmTemperature) / temperatureRange

  const x =
    pos < 0.5 ? findColorBetween(warmColor, white, pos * 2) : findColorBetween(white, coolColor, (pos - 0.5) * 2)

  return `rgb(${Math.round(x.r)}, ${Math.round(x.g)}, ${Math.round(x.b)})`
}

export function angleToColorTemperature(angle: number) {
  let normalizedAngle: number
  if (angle <= 90) {
    // 0° to 90°: white to light blue (0.5 to 1 in temp scale)
    normalizedAngle = 0.5 + (angle / 90) * 0.5
  } else if (angle <= 180) {
    // 90° to 180°: light blue to white (1 to 0.5 in temp scale)
    normalizedAngle = 1 - ((angle - 90) / 90) * 0.5
  } else if (angle <= 270) {
    // 180° to 270°: white to orange (0.5 to 0 in temp scale)
    normalizedAngle = 0.5 - ((angle - 180) / 90) * 0.5
  } else {
    // 270° to 360°: orange to white (0 to 0.5 in temp scale)
    normalizedAngle = ((angle - 270) / 90) * 0.5
  }
  return warmTemperature + normalizedAngle * (coolTemperature - warmTemperature)
}

export function colorTemperatureToAngle(colorTemperature: number, handleAngle: number): number {
  // 0 -> warm @ 270
  // 1 -> cool @ 90
  const normalizedAngle = (colorTemperature - warmTemperature) / (coolTemperature - warmTemperature)
  let angle
  if (handleAngle > 90 && handleAngle < 270) {
    angle = 0 + (1 - normalizedAngle) * 180
  } else {
    angle = 180 + normalizedAngle * 180
  }
  return angle % 360
}

export function angleToColorHue(angle: number): number {
  // Convert to hue (0-360), accounting for rotation offset
  let hue = -angle - 35 + 90
  // Normalize to 0-360
  return ((hue % 360) + 360) % 360
}

export function colorHueToAngle(hue: number): number {
  return -(hue + 35)
}

export function rgbColorFunction(i: number, steps: number): string {
  // Derive hue from step along the circle
  const hue = i * (360 / steps)
  return `hsl(${hue}, 100%, 50%)`
}

export function cctColorFunction(i: number, steps: number): string {
  const angle = i * (360 / steps)
  const displayAngle = (-angle + 55 + 360) % 360
  const temperature = angleToColorTemperature(displayAngle)
  return colorTemperatureToDisplayColor(temperature)
}
