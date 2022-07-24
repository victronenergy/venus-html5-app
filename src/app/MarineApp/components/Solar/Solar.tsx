import React from "react"

import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"
import NumericValue from "../../../components/NumericValue"

import SolarIcon from "../../images/icons/icon_solar.svg"
import { usePvCharger } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"
import { useVisibilityNotifier } from "app/MarineApp/modules"
import { WIDGET_TYPES } from "app/MarineApp/utils/constants"
import { translate } from "react-i18nify"
import { ListViewWithTotals, ListRow } from "../ListViewWithTotals"

const Solar = observer(() => {
  const { current, power } = usePvCharger()
  const visible = !!(current || power || power === 0)

  useVisibilityNotifier({ widgetName: WIDGET_TYPES.SOLAR, visible })

  if (visible) {
    return (
      <ColumnContainer>
        <ListViewWithTotals
          icon={SolarIcon}
          title={translate("widgets.solar")}
          totals={power}
          subTitle={false}
          child={false}
        >
          <ListRow>
            <MetricValues>
              <NumericValue value={current} unit="A" precision={1} />
              <NumericValue value={power} unit={"W"} />
            </MetricValues>
          </ListRow>
        </ListViewWithTotals>
      </ColumnContainer>
    )
  } else {
    return null
  }
})

export default Solar
