import React from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId } from "@victronenergy/mfd-modules"
import { SwitchableOutputType, SWITCHABLE_OUTPUT_TYPE } from "@victronenergy/mfd-modules/dist/src/utils/constants"
import MomentaryOutput from "./MomentaryOutput"
import { observer } from "mobx-react"
import ToggleOutput from "./ToggleOutput"
import DimmableOutput from "./DimmableOutput"

interface SwitchableOutputProps {
  key: string
  type: SwitchableOutputType
  deviceId: SwitchingDeviceInstanceId
  outputId: SwitchableOutputId
  className?: string
}

const SwitchableOutput = observer((props: SwitchableOutputProps) => {
  const key = `${props.deviceId}_${props.outputId}`
  switch (props.type) {
    case SWITCHABLE_OUTPUT_TYPE.MOMENTARY_SWITCH:
      return (
        <MomentaryOutput key={key} deviceId={props.deviceId} outputId={props.outputId} className={props.className} />
      )
    case SWITCHABLE_OUTPUT_TYPE.TOGGLE_SWITCH:
      return <ToggleOutput key={key} deviceId={props.deviceId} outputId={props.outputId} className={props.className} />
    case SWITCHABLE_OUTPUT_TYPE.DIMMABLE:
      return (
        <DimmableOutput key={key} deviceId={props.deviceId} outputId={props.outputId} className={props.className} />
      )
    // case SWITCHABLE_OUTPUT_TYPE.TEMPERATURE_SETPOINT:
    //   return <TemperatureSetpointOutput {...output} />
    // case SWITCHABLE_OUTPUT_TYPE.MULTI_STEP:
    //   return <MultiStepOutput {...output} />;
    // case SWITCHABLE_OUTPUT_TYPE.MULTI_OPTION:
    //   return <MultiOptionOutput {...output} />;
    // case SWITCHABLE_OUTPUT_TYPE.SLIDER:
    //   return <SliderOutput {...output} />;
  }
})

export default SwitchableOutput
