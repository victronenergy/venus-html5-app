import React from "react"

import { useActiveInValues } from "@victronenergy/mfd-modules"

import { ListRow } from "../ListView"
import NumericValue from "../../../components/NumericValue"
import { observer } from "mobx-react"

type ActiveInValuesProps = {
  phases: number
}

const ActiveInValues = observer(({ phases }: ActiveInValuesProps) => {
  const { current, voltage, power } = useActiveInValues()
  if (current && voltage && power && phases) {
    return phases > 1 ? (
      <div>
        {voltage.slice(0, phases).map((v, i) => (
          <ListRow key={i}>
            <span className="value value__phase">L {i + 1}</span>
            <NumericValue value={v} unit="V" />
            <NumericValue value={current[i]} unit="A" precision={1} />
            <NumericValue value={power[i]} unit={"W"} />
          </ListRow>
        ))}
      </div>
    ) : (
      <div>
        <NumericValue value={voltage[0]} unit={"V"} />
        <NumericValue value={current[0]} unit="A" precision={1} />
        <NumericValue value={power[0]} unit="W" />
      </div>
    )
  } else {
    return <div />
  }
})

export default ActiveInValues
