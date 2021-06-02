import React from "react"

import { useGensetValues } from "../../../modules"

import { ListRow } from "../ListView"
import NumericValue from "../../../components/NumericValue"

type GensetValuesProps = {
  phases: number
}

export const GensetValues = ({ phases }: GensetValuesProps) => {
  const { voltage, current, power, frequency, coolant, winding, exhaust } = useGensetValues()
  const temperatures = (
    <ListRow key="temperatures">
      <span className="value value__temperature">Coolant</span>
      <NumericValue value={coolant} unit="°C" />
      <span className="value value__temperature">Winding</span>
      <NumericValue value={winding} unit="°C" />
      <span className="value value__temperature">Exhaust</span>
      <NumericValue value={exhaust} unit="°C" />
    </ListRow>
  )
  if (voltage) {
    return (
      <div>
        {phases > 1 ? (
          voltage
            .slice(0, phases)
            .map((v, i) => (
              <ListRow key={i}>
                <span className="value value__phase">L {i + 1}</span>
                <NumericValue value={v} unit="V" />
                <NumericValue value={current[i]} unit="A" precision={1} />
                <NumericValue value={power[i]} unit="W" />
                <NumericValue value={frequency[i]} unit="Hz" />
              </ListRow>
            ))
            .concat(temperatures)
        ) : (
          <>
            <NumericValue value={voltage[0]} unit={"V"} />
            <NumericValue value={current[0]} unit="A" precision={1} />
            <NumericValue value={power[0]} unit="W" />
            <NumericValue value={frequency[0]} unit="Hz" />
            <div className="metric__values__temperatures">{temperatures}</div>
          </>
        )}
      </div>
    )
  } else {
    return <div />
  }
}

export default GensetValues
