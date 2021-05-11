import React from "react"

import HeaderView from "../HeaderView/HeaderView"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"
import NumericValue from "../../../components/NumericValue"

import SolarIcon from "../../images/icons/icon_solar.svg"
import { usePvCharger } from "../../../modules"

const Solar = () => {
  const { current, power } = usePvCharger()
  return (
    <ColumnContainer>
      <HeaderView icon={SolarIcon} title="Solar">
        <MetricValues>
          <NumericValue value={current} unit="A" precision={1} />
          <NumericValue value={power} unit="W" />
        </MetricValues>
      </HeaderView>
    </ColumnContainer>
  )
}

export default Solar
