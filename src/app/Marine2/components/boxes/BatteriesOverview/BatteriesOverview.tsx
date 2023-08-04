import { observer } from "mobx-react-lite"
import { Battery as BatteryType, useBattery } from "@elninotech/mfd-modules"
import Box from "../../ui/Box"
import { BATTERY, BoxTypes } from "../../../utils/constants"
import Battery from "../Battery"
import BatteriesIcon from "../../../images/icons/batteries.svg"
import BatterySummary from "../../ui/BatterySummary"
import { AppViews } from "../../../modules/AppViews"
import { translate } from "react-i18nify"
import { useVisibilityNotifier } from "../../../modules"
import GridPaginator from "../../ui/GridPaginator"
import { useEffect, useState, useRef } from "react"
import { PageSelectorProps } from "../../ui/PageSelector"
import { boxBreakpoints } from "../../../utils/media"
import PageFlipper from "../../ui/PageFlipper"
import range from "lodash-es/range"
import ResizeObserver from "resize-observer-polyfill"

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

  const circleRef = useRef<HTMLDivElement>(null)
  const circleBoxRef = useRef<HTMLDivElement>(null)
  const [circleScale, setCircleScale] = useState(1)

  useEffect(() => {
    if (!circleRef.current) return
    if (!circleBoxRef.current) return

    const observer = new ResizeObserver(() => {
      if (!circleRef.current) return
      if (!circleBoxRef.current) return
      if (boxSize.width < boxBreakpoints["sm-m"].width || boxSize.height - 50 < boxBreakpoints["sm-m"].height) {
        setCircleScale(
          // remove 32px for Box horizontal padding (mx-4 * 2)
          0.9 *
            Math.min(
              (circleBoxRef.current.clientHeight - 16) / circleRef.current.offsetHeight,
              (circleBoxRef.current.clientWidth / pages - 32) / (circleRef.current.offsetWidth * perPage + 8)
            )
        )
      } else {
        setCircleScale(1)
      }
    })
    observer.observe(circleBoxRef.current)
    return () => {
      observer.disconnect()
    }
  }, [circleBoxRef, circleRef, pages, perPage, boxSize.width, boxSize.height])

  useEffect(() => {
    if (!overviewBatteries || !overviewBatteries.length) return

    let batterySummaryWidth = 92 // minimum BatterySummary component width
    // BatterySummary component width is bigger based on these breakpoints (subtract 56 leaving space for page selector)
    if (boxSize.height - 50 > boxBreakpoints["sm-m"].height) {
      batterySummaryWidth = 302
    } else if (boxSize.height - 50 > boxBreakpoints["sm-s"].height) {
      batterySummaryWidth = 230
    } else if (boxSize.height - 50 > boxBreakpoints["xs-xs"].height) {
      batterySummaryWidth = 142
    }

    const batteriesPerPage = Math.max(Math.floor((boxSize.width - 32) / batterySummaryWidth), 1) // -32 due to box padding

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
        <PageFlipper pages={pages}>
          <div
            className={"h-full flex"}
            style={{
              width: `${pages}00%`,
            }}
            ref={circleBoxRef}
          >
            {range(pages).map((page) => (
              <div
                key={page + "batteryPage"}
                className={"flex w-full h-full items-center justify-center gap-1 md:gap-2"}
              >
                {overviewBatteries.slice(page * perPage, (page + 1) * perPage).map((b) => (
                  <div
                    key={b.id}
                    className={"h-full flex items-center justify-center"}
                    style={{
                      transform: `scale(${circleScale})`,
                    }}
                  >
                    <BatterySummary
                      key={b.id}
                      battery={b}
                      boxSize={{
                        width: boxSize.width,
                        height: pages <= 1 ? boxSize.height - 50 : boxSize.height - 100,
                      }}
                      circleRef={circleRef}
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
      childClassName={"p-1"}
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
