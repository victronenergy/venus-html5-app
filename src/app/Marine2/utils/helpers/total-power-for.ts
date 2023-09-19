export const totalPowerFor = (values?: number[]) =>
  values?.reduce((total, power) => {
    return power ? total + power : total
  }, 0)
