import { observer } from "mobx-react-lite"
import { Battery as BatteryType, useBattery } from "@elninotech/mfd-modules"
import Box from "../../ui/Box"
import { BATTERY, BoxTypes } from "../../../utils/constants"
import Grid from "../../ui/Grid"
import Battery from "../Battery/Battery"
import BatteriesIcon from "../../../images/icons/batteries.svg"
import BatterySummary from "../../ui/BatterySummary"
import { withErrorBoundary } from "react-error-boundary"
import { AppViews } from "../../../modules/AppViews"
import { translate } from "react-i18nify"
import { appErrorBoundaryProps } from "../../ui/Error/appErrorBoundary"
import { useVisibilityNotifier } from "../../../modules"
import Paginator from "../../ui/Paginator"
import { useState } from "react"

interface Props {
  mode?: "compact" | "full"
}

const BatteriesOverview = ({ mode = "full" }: Props) => {
  const { batteries } = useBattery()
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  useVisibilityNotifier({ widgetName: BoxTypes.BATTERIES, visible: !!(batteries && batteries.length) })

  const sortedBatteries = sortBatteries(batteries ?? [])
  const overviewBatteries = getOverviewBatteries(sortedBatteries)

  const getDetailBatteries = function () {
    let boxes: JSX.Element[] = []

    batteries.forEach((b) => {
      boxes.push(<Battery key={b.id} battery={b} mode="full" />)
    })
    return boxes
  }

  if (mode === "compact") {
    return (
      <Box
        /* todo: fix types for svg */
        /* @ts-ignore */
        icon={<BatteriesIcon className={"w-6 text-victron-gray dark:text-victron-gray-dark"} />}
        title={translate("boxes.batteries")}
        linkedView={AppViews.BOX_BATTERIES_OVERVIEW}
        getBoxSizeCallback={setBoxSize}
      >
        <Paginator selectorLocation={"top-center"}>
          {overviewBatteries.map((b) => (
            <div className={"h-full flex items-center justify-center"}>
              <BatterySummary key={b.id} battery={b} boxSize={boxSize} />
            </div>
          ))}
        </Paginator>
      </Box>
    )
  }

  return <Grid childClassName={"p-1"}>{getDetailBatteries()}</Grid>
}

/*
 Sort batteries by state (charging > discharging > idle) and within that by id.
 */
const sortBatteries = function (batteries: BatteryType[]) {
  return batteries.slice().sort((a, b) => {
    if (
      (a.state === BATTERY.CHARGING && b.state !== BATTERY.CHARGING) ||
      (a.state === BATTERY.DISCHARGING && b.state === BATTERY.IDLE) ||
      ((a.state || a.state === 0) && !b.state && b.state !== 0)
    )
      return -1

    if (
      (a.state !== BATTERY.CHARGING && b.state === BATTERY.CHARGING) ||
      (a.state === BATTERY.IDLE && b.state === BATTERY.DISCHARGING) ||
      (!a.state && a.state !== 0 && (b.state || b.state === 0))
    )
      return 1

    return +a.id - +b.id
  })
}

/*
  We show only batteries with state data on the overview, but if we don't
  have any we will show any batteries.
 */
const getOverviewBatteries = function (batteries: BatteryType[]) {
  const withStateCount = batteries.filter((b) => b.state || b.state === 0).length
  if (withStateCount === 0) {
    return batteries
  }
  return batteries.slice(0, withStateCount)
}

export default withErrorBoundary(observer(BatteriesOverview), appErrorBoundaryProps)
