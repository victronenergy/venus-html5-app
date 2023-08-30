import DcIcon from "../../images/icons/dc.svg"
import { DcLoadsState, useDcLoads } from "@victronenergy/mfd-modules"
import HeaderView from "../HeaderView"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"
import NumericValue from "../../../components/NumericValue"
import { observer } from "mobx-react"
import { useVisibilityNotifier } from "app/MarineApp/modules"
import { WIDGET_TYPES } from "app/MarineApp/utils/constants"
import { translate } from "react-i18nify"

export const DcLoads = observer((props?: Partial<DcLoadsState>) => {
  let { voltage, power } = useDcLoads()
  voltage = props?.voltage ?? voltage
  power = props?.power ?? power

  useVisibilityNotifier({ widgetName: WIDGET_TYPES.DC_LOADS, visible: !!power })

  if (power) {
    return (
      <ColumnContainer>
        <HeaderView icon={DcIcon} title={translate("widgets.dcLoads")} showBoat>
          <MetricValues>
            <NumericValue value={power / voltage || undefined} unit="A" precision={1} />
            <NumericValue value={power} unit="W" />
          </MetricValues>
        </HeaderView>
      </ColumnContainer>
    )
  } else {
    return <div />
  }
})

export default DcLoads
