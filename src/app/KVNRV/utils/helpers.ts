export const normalizePower = (power: number, max: number) => {
  return Math.max(Math.min(power / max, 1), 0)
}

export const sum = (arr: number[]) => {
  return arr.reduce((a, b) => a + b)
}
