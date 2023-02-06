export const formatPower = (power: number) => {
  if (power >= 1000) {
    return (power / 1000).toFixed(1)
  }

  return power.toFixed(1)
}

export const formatValue = (value: number) => {
  return value.toFixed(1)
}