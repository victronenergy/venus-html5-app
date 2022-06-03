import React from "react"

import { useGensetValues } from "@elninotech/mfd-modules"

import { ListRow } from "../ListView"
import NumericValue from "../../../components/NumericValue"
import { Translate } from "react-i18nify"
import { observer } from "mobx-react"

type GensetValuesProps = {
  phases: number
  dcGenerator: boolean
}

export const GensetValues = observer(({ phases, dcGenerator }: GensetValuesProps) => {
  const { voltage, current, power, frequency, dcVoltage, dcCurrent, dcPower, coolant, winding, exhaust, heatsink } =
    useGensetValues()
  const temperatures = (
    <ListRow key="temperatures">
      <span className="value value__temperature">
        <Translate value="generator.temperature.coolant" />
      </span>
      <NumericValue value={coolant} unit="°C" />
      <span className="value value__temperature">
        <Translate value="generator.temperature.winding" />
      </span>
      <NumericValue value={winding} unit="°C" />
      <span className="value value__temperature">
        <Translate value="generator.temperature.exhaust" />
      </span>
      <NumericValue value={exhaust} unit="°C" />
      {dcGenerator ? (
        <>
          <span className="value value__temperature">
            <Translate value="generator.temperature.heatsink" />
          </span>
          <NumericValue value={heatsink} unit="°C" />
        </>
      ) : (
        <></>
      )}
    </ListRow>
  )
  if (voltage && !dcGenerator) {
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
  } else if (dcGenerator) {
    return (
      <div>
        <NumericValue value={dcVoltage} unit={"V"} />
        <NumericValue value={dcCurrent} unit="A" precision={1} />
        <NumericValue value={dcPower} unit="W" />
        <div className="metric__values__temperatures">{temperatures}</div>
      </div>
    )
  } else {
    return <div />
  }
})

export default GensetValues
