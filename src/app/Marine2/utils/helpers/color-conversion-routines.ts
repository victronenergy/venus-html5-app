export function hsvToHsl(h: number, s: number, v: number): string {
  s = s / 100
  v = v / 100

  const l = v * (1 - s / 2)
  const sHsl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l)

  return `hsl(${h}, ${Math.round(sHsl * 100)}%, ${Math.round(l * 100)}%)`
}
