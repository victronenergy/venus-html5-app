import React from "react"

import HeaderView from "../HeaderView"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"
import { useAcLoads } from "../../../modules"
import NumericValue from "../../../components/NumericValue"

import AcIcon from "../../images/icons/ac.svg"
import { ListView, ListRow } from "../ListView"

const AcLoads = () => {
  const { current, voltage, power, phases } = useAcLoads()
  const showAsList = phases > 1

  return showAsList ? (
    <ColumnContainer>
      <ListView icon={AcIcon} title="AC Loads" subTitle={`${phases} phases`} child={false}>
        {voltage.slice(0, phases).map((v, i) => (
          <ListRow key={i}>
            <span className="value value__phase">L {i + 1}</span>
            <NumericValue value={v} unit="V" />
            <NumericValue value={current[i]} unit="A" precision={1} />
            <NumericValue value={power[i]} unit={"W"} />
          </ListRow>
        ))}
      </ListView>
    </ColumnContainer>
  ) : (
    <ColumnContainer>
      <HeaderView icon={AcIcon} title="AC Loads">
        <MetricValues>
          <NumericValue value={voltage[0]} unit="V" />
          <NumericValue value={current[0]} unit="A" precision={1} />
          <NumericValue value={power[0]} unit={"W"} />
        </MetricValues>
      </HeaderView>
    </ColumnContainer>
  )
}

export default AcLoads