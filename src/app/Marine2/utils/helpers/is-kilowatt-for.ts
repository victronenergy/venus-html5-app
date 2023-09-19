export const isKilowattFor = (value?: number): boolean => {
  if (!value) {
    return false
  }

  // Check for absolute values, for batteries the value is a negative number.
  return Math.abs(value) >= 1000
}
