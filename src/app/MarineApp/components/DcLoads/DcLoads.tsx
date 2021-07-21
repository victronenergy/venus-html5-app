import DcIcon from "../../images/icons/dc.svg"
import { DcLoadsState, useDcLoads } from "@elninotech/mfd-modules"
import HeaderView from "../HeaderView"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"
import NumericValue from "../../../components/NumericValue"
import { observer } from "mobx-react"

export const DcLoads = observer((props?: Partial<DcLoadsState>) => {
  let { voltage, power } = useDcLoads()
  voltage = props?.voltage ?? voltage
  power = props?.power ?? power

  if (power) {
    return (
      <ColumnContainer>
        <HeaderView icon={DcIcon} title="DC Loads" showBoat>
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
