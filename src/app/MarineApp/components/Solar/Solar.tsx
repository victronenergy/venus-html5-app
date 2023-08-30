import React from "react"

import HeaderView from "../HeaderView/HeaderView"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"
import NumericValue from "../../../components/NumericValue"

import SolarIcon from "../../images/icons/icon_solar.svg"
import { usePvCharger } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react"
import { useVisibilityNotifier } from "app/MarineApp/modules"
import { WIDGET_TYPES } from "app/MarineApp/utils/constants"
import { translate } from "react-i18nify"

const Solar = observer(() => {
  const { current, power } = usePvCharger()
  const visible = !!(current || power || power === 0)

  useVisibilityNotifier({ widgetName: WIDGET_TYPES.SOLAR, visible })

  if (visible) {
    return (
      <ColumnContainer>
        <HeaderView icon={SolarIcon} title={translate("widgets.solar")}>
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
