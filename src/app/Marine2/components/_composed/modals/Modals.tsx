import React, { FC } from "react"
import { AutoStartStopModal } from "./auto-start-stop"
import { GeneratorStopInfo } from "./generator-stop-info"

export const Modals: FC = () => (
  <>
    <AutoStartStopModal />
    <GeneratorStopInfo />
  </>
)
