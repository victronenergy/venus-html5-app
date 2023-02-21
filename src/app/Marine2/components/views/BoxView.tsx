import React, { useMemo } from "react"
import { AppViews } from "../../modules/AppViews"
import MainLayout from "../ui/MainLayout"

const EnergyOverview = React.lazy(() => import("../boxes/EnergyOverview"))
const Tanks = React.lazy(() => import("../boxes/Tanks"))
const BatteriesOverview = React.lazy(() => import("../boxes/BatteriesOverview"))
const DevicesOverview = React.lazy(() => import("../boxes/DevicesOverview"))

const BoxView = ({ boxId }: BoxViewProps) => {
  const getBox = useMemo(() => {
    switch (boxId) {
      case AppViews.BOX_TANKS:
        return <Tanks />
      case AppViews.BOX_BATTERIES_OVERVIEW:
        return <BatteriesOverview />
      case AppViews.BOX_ENERGY_OVERVIEW:
        return <EnergyOverview mode={"full"} />
      case AppViews.BOX_DEVICES_OVERVIEW:
        return <DevicesOverview mode={"full"} />
      default:
        // todo: replace with component
        return <div>Not found</div>
    }
  }, [boxId])

  return <MainLayout>{getBox}</MainLayout>
}

interface BoxViewProps {
  boxId: AppViews
}

export default BoxView
