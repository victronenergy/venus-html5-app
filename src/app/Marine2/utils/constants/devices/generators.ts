export const GENERATOR_START_STOP = {
  STOP: 0,
  START: 1,
  AUTO_ON: 1,
  AUTO_OFF: 0,
}

export const RELAY_FUNCTION = {
  GENERATOR_START_STOP: 1,
}

type T_GENSET_STATE = {
  STANDBY: number,
  STARTING: number[],
  RUNNING: number,
  STOPPING: number,
  ERROR: number,
}

export const GENSET_STATE: T_GENSET_STATE = {
  STANDBY: 0,
  STARTING: [1, 2, 3, 4, 5, 6, 7],
  RUNNING: 8,
  STOPPING: 9,
  ERROR: 10,
}
