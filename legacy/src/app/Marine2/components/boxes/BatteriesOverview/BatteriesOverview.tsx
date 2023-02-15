import { observer } from "mobx-react-lite"
import { useBattery } from "@elninotech/mfd-modules"
import { Battery as BatteryType } from "@elninotech/mfd-modules"
import Box from "../../ui/Box"
import { BATTERY } from "../../../utils/constants"
import Grid from "../../../components/ui/Grid"
import Battery from "../../../components/boxes/Battery/Battery"
import BatteriesIcon from "../../../images/icons/batteries.svg"
import BatterySummary from "../../../components/ui/BatterySummary"
import AuxiliaryBatteries from "../Batteries/AuxiliaryBatteries"
import { withErrorBoundary } from "react-error-boundary"
import ErrorFallback from "../../../components/ui/ErrorBoundary/ErrorFallback"
import { AppViews } from "../../../modules/AppViews"
import { translate } from "react-i18nify"

const BatteriesOverview = ({ mode = "full" }: Props) => {
  const { batteries } = useBattery()

  const sortedBatteries = sortBatteries(batteries ?? [])
  const overviewBatteries = getOverviewBatteries(sortedBatteries, 2)
  const auxiliaryBatteries = sortedBatteries.filter((b) => !overviewBatteries.includes(b))

  const getDetailBatteries = function () {
    let boxes = []

    overviewBatteries.forEach((b) => {
      boxes.push(<Battery key={b.id} battery={b} mode="full" />)
    })

    if (auxiliaryBatteries.length > 0) {
      boxes.push(<AuxiliaryBatteries key={"auxiliary"} batteries={auxiliaryBatteries} />)
    }

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
      >
        <div className={"flex justify-center items-center h-full -mx-4"}>
          {overviewBatteries.map((b) => (
            <BatterySummary key={b.id} battery={b} className={overviewBatteries.length > 1 ? "w-6/12" : ""} />
          ))}
        </div>
      </Box>
    )
  }

  return <Grid className={"gap-2"}>{getDetailBatteries()}</Grid>
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
const getOverviewBatteries = function (batteries: BatteryType[], max: number) {
  const withStateCount = batteries.filter((b) => b.state || b.state === 0).length
  if (withStateCount === 0) {
    return batteries.slice(0, max)
  }
  return batteries.slice(0, Math.min(withStateCount, max))
}

// fixme: this causes type errors in the RootView component
const ComponentWithErrorBoundary = withErrorBoundary(observer(BatteriesOverview), {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.error(error, info)
  },
})

interface Props {
  mode?: "compact" | "full"
}

export default observer(BatteriesOverview)
// export default ComponentWithErrorBoundary
