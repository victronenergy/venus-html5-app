import React from "react"

import HeaderView from "../HeaderView/HeaderView"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"
import NumericValue from "../../../components/NumericValue"

import SolarIcon from "../../images/icons/icon_solar.svg"
import { usePvCharger } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"
import { useVisibilityNotifier } from "app/MarineApp/modules"

const Solar = observer(() => {
  const { current, power } = usePvCharger()
  const visible = !!(current || power || power === 0)

  useVisibilityNotifier({ widgetName: "Solar", visible })

  if (visible) {
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
})

export default Solar
