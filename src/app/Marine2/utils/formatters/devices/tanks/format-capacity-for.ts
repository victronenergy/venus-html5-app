// Convert remaining and total capacity to required unit from m3
export const formatCapacityFor = (capacity: number, unit: number) => {
  if (capacity === undefined) return "--"

  switch (unit) {
    case 0:
      return Number(capacity.toFixed(2))
    case 1:
      return Math.round(capacity * 1000)
    case 2:
      return Math.round(capacity * 219.969)
    case 3:
      return Math.round(capacity * 264.172)
    default:
      return Math.round(capacity)
  }
}
