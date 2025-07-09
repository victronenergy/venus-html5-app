import React from "react"
import { SwitchableOutputId, SwitchingDeviceInstanceId } from "@victronenergy/mfd-modules"
import { SwitchableOutputType, SWITCHABLE_OUTPUT_TYPE } from "@victronenergy/mfd-modules/dist/src/utils/constants"
import MomentaryOutput from "./MomentaryOutput"
import { observer } from "mobx-react"
import ToggleOutput from "./ToggleOutput"

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
    case SWITCHABLE_OUTPUT_TYPE.MOMENTARY:
      return (
        <MomentaryOutput key={key} deviceId={props.deviceId} outputId={props.outputId} className={props.className} />
      )
    case SWITCHABLE_OUTPUT_TYPE.TOGGLE:
      return <ToggleOutput key={key} deviceId={props.deviceId} outputId={props.outputId} className={props.className} />
    // case SWITCHABLE_OUTPUT_TYPE.DIMMABLE:
    //   return <DimmableOutput {...output} />
    // case SWITCHABLE_OUTPUT_TYPE.TEMPERATURE_SETPOINT:
    //   return <TemperatureSetpointOutput {...output} />
    // case SWITCHABLE_OUTPUT_TYPE.MULTI_STEP:
    //   return <MultiStepOutput {...output} />;
    // case SWITCHABLE_OUTPUT_TYPE.MULTI_OPTION:
    //   return <MultiOptionOutput {...output} />;
    // case SWITCHABLE_OUTPUT_TYPE.SLIDER:
    //   return <SliderOutput {...output} />;
    // default:
    //   return <div>Unknown output type</div>;
  }
})

export default SwitchableOutput
