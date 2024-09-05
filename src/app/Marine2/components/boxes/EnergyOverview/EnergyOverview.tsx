import { FC, useState } from "react"
import classNames from "classnames"
import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import Box from "../../../components/ui/Box"
import EnergyIcon from "../../../images/icons/energy.svg"
import { useVebus } from "@victronenergy/mfd-modules"
import { AppViews } from "../../../modules/AppViews"
import { useVisibilityNotifier } from "../../../modules"
import GridPaginator from "../../ui/GridPaginator"
import { PageSelectorProps } from "../../ui/PageSelector"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { useAvailableEnergyBoxes } from "../../../utils/hooks/use-available-energy-boxes"
import { ISize } from "@m2Types/generic/size"
import { BOX_TYPES } from "../../../utils/constants/generic"

interface Props {
  componentMode?: ComponentMode
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

const EnergyOverview: FC<Props> = ({ componentMode = "full", pageSelectorPropsSetter }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vebus = useVebus() // We need this hook to enable some MQTT subscriptions
  const [compactBoxSize, setCompactBoxSize] = useState<ISize>({ width: 0, height: 0 })
  const boxes = useAvailableEnergyBoxes(compactBoxSize, componentMode)
  const activeStyles = applyStyles(compactBoxSize, defaultBoxStyles)

  const hasValidData = boxes.length > 0

  useVisibilityNotifier({ widgetName: BOX_TYPES.ENERGY, isVisible: hasValidData })

  if (!boxes.length) {
    return null
  }

  if (componentMode === "compact") {
    return (
      <Box
        title={translate("boxes.energy")}
        icon={
          <EnergyIcon className={classNames("text-victron-gray dark:text-victron-gray-dark", activeStyles?.icon)} />
        }
        linkedView={AppViews.BOX_ENERGY_OVERVIEW}
        getBoxSizeCallback={setCompactBoxSize}
        withPagination={true}
        paginationOrientation={"vertical"}
      >
        {boxes}
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
      {boxes}
    </GridPaginator>
  )
}

export default observer(EnergyOverview)
