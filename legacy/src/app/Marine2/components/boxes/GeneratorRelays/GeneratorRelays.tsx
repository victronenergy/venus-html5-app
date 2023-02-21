import { useGeneratorRelay } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"
import { AC_SOURCE, RELAY_FUNCTION } from "../../../utils/constants"
import GeneratorRelay from "./GeneratorRelay"

const GeneratorRelays = ({ mode = "compact" }: Props) => {
  const values = useGeneratorRelay()
  if (values.settings) {
    return (
      <>
        {values.settings.includes(AC_SOURCE.GENERATOR)
          ? values.settings.map(
              (source: number, i: number) =>
                source === AC_SOURCE.GENERATOR && (
                  <GeneratorRelay
                    key={"generator_relay" + i}
                    {...values}
                    active={values.activeInput === i}
                    mode={mode}
                  />
                )
            )
          : values.relayFunction === RELAY_FUNCTION.GENERATOR_START_STOP &&
            values.statusCode !== undefined && <GeneratorRelay {...values} mode={mode} />}
      </>
    )
  } else {
    return null
  }
}

interface Props {
  mode?: "compact" | "full"
}

export default observer(GeneratorRelays)
