export const formatPower = (power: number) => {
  // check if power is undefined
  if (power === undefined) {
    return "--"
  }

  if (power >= 1000) {
    return (power / 1000).toFixed(1)
  }

  return power.toFixed(1)
}

export const formatValue = (value: number) => {
  if (value === undefined) {
    return "--"
  }

  return value.toFixed(1)
}
