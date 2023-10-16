export const tankUnitFor = (value: number) => {
  switch (value) {
    case 0:
      return "m³"
    case 1:
      return "ℓ"
    case 2:
      return "gal"
    case 3:
      return "gal"
    default:
      return "m³"
  }
}
