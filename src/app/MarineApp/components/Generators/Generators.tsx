import React from "react"

import { useGeneratorRelays, GeneratorInstanceId } from "@elninotech/mfd-modules"

import GeneratorFp from "./GeneratorFp"
import GeneratorRelay from "./GeneratorRelay"

const Generators = () => {
  const generatorStore = useGeneratorRelays()
  return (
    <>
      {generatorStore.generators.map((instanceId: GeneratorInstanceId) => {
        return (
          <>
            <GeneratorRelay instanceId={instanceId} />
            <GeneratorFp instanceId={instanceId} />
          </>
        )
      })}
    </>
  )
}

export default Generators
