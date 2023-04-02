import React, { useMemo, useState } from "react"
import { AppViews } from "../../modules/AppViews"
import MainLayout from "../ui/MainLayout"
import { PageSelectorProps } from "../ui/PageSelector"

const EnergyOverview = React.lazy(() => import("../boxes/EnergyOverview"))
const Tanks = React.lazy(() => import("../boxes/Tanks"))
const BatteriesOverview = React.lazy(() => import("../boxes/BatteriesOverview"))
const DevicesOverview = React.lazy(() => import("../boxes/DevicesOverview"))
const EnvironmentOverview = React.lazy(() => import("../boxes/EnvironmentOverview"))

const BoxView = ({ boxId }: BoxViewProps) => {
  const [pageSelectorProps, setPageSelectorProps] = useState<PageSelectorProps>()

  const getBox = useMemo(() => {
    switch (boxId) {
      case AppViews.BOX_TANKS:
        return <Tanks />
      case AppViews.BOX_BATTERIES_OVERVIEW:
        return <BatteriesOverview pageSelectorPropsSetter={setPageSelectorProps} />
      case AppViews.BOX_ENERGY_OVERVIEW:
        return <EnergyOverview pageSelectorPropsSetter={setPageSelectorProps} />
      case AppViews.BOX_DEVICES_OVERVIEW:
        return <DevicesOverview pageSelectorPropsSetter={setPageSelectorProps} />
      case AppViews.BOX_ENVIRONMENT_OVERVIEW:
        return <EnvironmentOverview pageSelectorPropsSetter={setPageSelectorProps} />
      default:
        // todo: replace with component
        return <div>Not found</div>
    }
  }, [boxId])

  return <MainLayout pageSelectorProps={pageSelectorProps}>{getBox}</MainLayout>
}

interface BoxViewProps {
  boxId: AppViews
}

export default BoxView
