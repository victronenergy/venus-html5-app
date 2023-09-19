export const isKilowattFor = (value?: number): boolean => {
  if (!value) {
    return false
  }

  return value >= 1000
}
