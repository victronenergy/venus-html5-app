import { GeneratorRelayProvider } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"
import { AC_SOURCE, RELAY_FUNCTION } from "../../../utils/constants"
import GeneratorRelay from "./GeneratorRelay"

const GeneratorRelays = ({ mode = "compact", generatorRelay }: Props) => {
  return (
    <>
      {generatorRelay.settings && generatorRelay.settings.includes(AC_SOURCE.GENERATOR)
        ? generatorRelay.settings.map(
            (source: number, i: number) =>
              source === AC_SOURCE.GENERATOR && (
                <GeneratorRelay
                  key={"generator_relay" + i}
                  {...generatorRelay}
                  active={generatorRelay.activeInput === i}
                  mode={mode}
                />
              )
          )
        : generatorRelay.relayFunction === RELAY_FUNCTION.GENERATOR_START_STOP &&
          generatorRelay.statusCode !== undefined && <GeneratorRelay {...generatorRelay} mode={mode} />}
    </>
  )
}

interface Props {
  mode?: "compact" | "full"
  generatorRelay: GeneratorRelayProvider
}

export default observer(GeneratorRelays)
