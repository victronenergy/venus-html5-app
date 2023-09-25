import { CURRENT_LIMIT_STEP } from "../constants/generic"

export const isCurrentStepDividable = (value: number) => value % CURRENT_LIMIT_STEP === 0

export const currentStepDecrementFor = (value: number) => value - (value % CURRENT_LIMIT_STEP)

export const currentStepIncrementFor = (value: number) => value + (CURRENT_LIMIT_STEP - (value % CURRENT_LIMIT_STEP))
