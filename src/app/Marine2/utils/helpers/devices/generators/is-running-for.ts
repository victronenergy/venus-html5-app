type FunctionType = (manualStart: number | undefined, statusCode: number | undefined) => boolean

export const isGeneratorRunningFor: FunctionType = (manualStart, statusCode) => {
  if (manualStart === undefined) {
    return !!statusCode && statusCode >= 1 && statusCode <= 8
  }

  return manualStart === 1
}
