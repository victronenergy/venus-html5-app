import { observer } from "mobx-react-lite"
import { Battery as BatteryType, useBattery } from "@elninotech/mfd-modules"
import Box from "../../ui/Box"
import { BATTERY, BoxTypes } from "../../../utils/constants"
import Battery from "../Battery/Battery"
import BatteriesIcon from "../../../images/icons/batteries.svg"
import BatterySummary from "../../ui/BatterySummary"
import { AppViews } from "../../../modules/AppViews"
import { translate } from "react-i18nify"
import { useVisibilityNotifier } from "../../../modules"
import GridPaginator from "../../ui/GridPaginator"
import { useEffect, useState } from "react"
import { PageSelectorProps } from "../../ui/PageSelector"
import { boxBreakpoints } from "../../../utils/media"
import PageFlipper from "../../ui/PageFlipper"
import range from "lodash-es/range"

interface Props {
  mode?: "compact" | "full"
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

const BatteriesOverview = ({ mode = "full", pageSelectorPropsSetter }: Props) => {
  const { batteries } = useBattery()
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  useVisibilityNotifier({ widgetName: BoxTypes.BATTERIES, visible: !!(batteries && batteries.length) })

  const sortedBatteries = sortBatteries(batteries ?? [])
  const overviewBatteries = getOverviewBatteries(sortedBatteries)

  const [pages, setPages] = useState(1)
  const [perPage, setPerPage] = useState(2)

  useEffect(() => {
    if (!overviewBatteries || !overviewBatteries.length) return

    let batterySummaryWidth = 142 // minimum BatterySummary component width
    // BatterySummary component width is bigger based on these breakpoints (subtract 56 leaving space for page selector)
    if (boxSize.height - 56 > boxBreakpoints["sm-m"].height) {
      batterySummaryWidth = 302
    } else if (boxSize.height - 56 > boxBreakpoints["sm-s"].height) {
      batterySummaryWidth = 230
    }

    const batteriesPerPage = Math.floor((boxSize.width - 32) / batterySummaryWidth) ?? 1 // -32 due to box padding

    setPerPage(batteriesPerPage)
    setPages(Math.ceil(overviewBatteries.length / batteriesPerPage))
  }, [boxSize, overviewBatteries])

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
        {/* TODO: set max items per page based on the available space */}
        <PageFlipper pages={pages}>
          <div
            className={"h-full flex"}
            style={{
              width: `${pages}00%`,
            }}
          >
            {range(pages).map((page) => (
              <div key={page + "batteryPage"} className={"flex w-full h-full items-center justify-center"}>
                {overviewBatteries.slice(page * perPage, (page + 1) * perPage).map((b) => (
                  <div key={b.id} className={"h-full flex items-center justify-center"}>
                    <BatterySummary
                      key={b.id}
                      battery={b}
                      boxSize={{ width: boxSize.width, height: boxSize.height - 50 }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </PageFlipper>
      </Box>
    )
  }

  return (
    <GridPaginator
      childClassName={"p-2"}
      perPage={4}
      orientation={"horizontal"}
      pageSelectorPropsSetter={pageSelectorPropsSetter}
      flow={window.innerWidth > window.innerHeight ? "row" : "col"}
    >
      {sortedBatteries.map((b) => (
        <Battery key={b.id} battery={b} />
      ))}
    </GridPaginator>
  )
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

export default observer(BatteriesOverview)
