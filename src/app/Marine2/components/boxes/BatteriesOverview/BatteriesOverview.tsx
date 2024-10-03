import { useEffect, useState } from "react"
import classNames from "classnames"
import { translate } from "react-i18nify"
import { observer } from "mobx-react-lite"
import range from "lodash-es/range"
import { useAppStore, useSystemBatteries } from "@victronenergy/mfd-modules"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"
import Box from "../../ui/Box"
import Battery from "../Battery"
import BatteriesIcon from "../../../images/icons/batteries.svg"
import { BatterySummary } from "../../ui/BatterySummary/BatterySummary"
import { AppViews } from "../../../modules/AppViews"
import { useVisibilityNotifier } from "../../../modules"
import GridPaginator from "../../ui/GridPaginator"
import { PageSelectorProps } from "../../ui/PageSelector"
import { boxBreakpoints } from "../../../utils/media"
import PageFlipper from "../../ui/PageFlipper"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import { BOX_TYPES } from "../../../utils/constants/generic"
import { sortBatteries } from "../../../utils/helpers/devices/batteries/sort-batteries"
import { batteriesForOverview } from "../../../utils/helpers/devices/batteries/batteries-for-overview"

interface Props {
  componentMode?: ComponentMode
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

const BatteriesOverview = ({ componentMode = "full", pageSelectorPropsSetter }: Props) => {
  const { electricalPowerIndicator } = useAppStore()
  const { batteries } = useSystemBatteries()
  const [boxSize, setBoxSize] = useState<ISize>({ width: 0, height: 0 })

  const { temperatureUnitToHumanReadable } = useAppStore()

  const hasValidData = !!(batteries && batteries.length)

  useVisibilityNotifier({ widgetName: BOX_TYPES.BATTERIES, isVisible: hasValidData })

  const sortedBatteries = sortBatteries(batteries ?? [])
  const overviewBatteries = batteriesForOverview(sortedBatteries)

  const [pages, setPages] = useState(1)
  const [perPage, setPerPage] = useState(2)

  const activeStyles = applyStyles(boxSize, defaultBoxStyles)

  useEffect(() => {
    if (!overviewBatteries || !overviewBatteries.length) return

    let batterySummaryWidth = 142 // minimum BatterySummary component width
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

  if (componentMode === "compact") {
    const batteriesFor = (page: number) => overviewBatteries.slice(page * perPage, (page + 1) * perPage)
    const size = {
      width: boxSize.width,
      height: pages <= 1 ? boxSize.height - 50 : boxSize.height - 100,
    }

    return (
      <Box
        icon={
          <BatteriesIcon className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles?.icon)} />
        }
        title={translate("boxes.batteries")}
        linkedView={AppViews.BOX_BATTERIES_OVERVIEW}
        getBoxSizeCallback={setBoxSize}
      >
        <PageFlipper pages={pages}>
          <div className="w-full h-full flex items-center justify-center" style={{ width: `${pages}00%` }}>
            {range(pages).map((page) => (
              <div key={page} className="flex gap-4 w-full h-full items-center justify-around">
                {batteriesFor(page).map((b) => (
                  <BatterySummary
                    key={b.id}
                    battery={b}
                    boxSize={size}
                    electricalPowerIndicator={electricalPowerIndicator}
                  />
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
      childClassName="p-1"
      perPage={4}
      orientation="horizontal"
      pageSelectorPropsSetter={pageSelectorPropsSetter}
      flow={window.innerWidth > window.innerHeight ? "row" : "col"}
    >
      {sortedBatteries.map((b) => (
        <Battery key={b.id} battery={b} unit={temperatureUnitToHumanReadable} />
      ))}
    </GridPaginator>
  )
}

export default observer(BatteriesOverview)
