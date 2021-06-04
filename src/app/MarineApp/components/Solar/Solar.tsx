import React from "react"

import HeaderView from "../HeaderView/HeaderView"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"
import NumericValue from "../../../components/NumericValue"

import SolarIcon from "../../images/icons/icon_solar.svg"
import { usePvCharger } from "@victronenergy/mfd-modules"

const Solar = () => {
  const { current, power } = usePvCharger()
  if (current || power || power === 0) {
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
  } else {
    return null
  }
}

export default Solar
