import { useCallback } from "react"
import { StartStopValue } from "../formatters/general/start-stop/format-start-stop-for"

type FunctionType = (running: boolean, autostart: number) => StartStopValue

export const useStartStopMode: FunctionType = (running, autoStart) =>
  useCallback(() => {
    if (running && !autoStart) {
      return 0
    } else if (!running && !autoStart) {
      return 1
    } else {
      return 2
    }
  }, [autoStart, running])()
