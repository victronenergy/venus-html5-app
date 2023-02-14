import React, { useMemo } from "react"
import { AppViews } from "../../modules/AppViews"
import MainLayout from "../ui/MainLayout"

const EnergyAC = React.lazy(() => import("../boxes/EnergyAC"))
const EnergyDC = React.lazy(() => import("../boxes/EnergyDC"))
const Tanks = React.lazy(() => import("../boxes/Tanks"))
const BatteriesOverview = React.lazy(() => import("../boxes/BatteriesOverview"))

const BoxView = ({ boxId }: BoxViewProps) => {
  const getBox = useMemo(() => {
    switch (boxId) {
      case AppViews.BOX_ENERGY_AC:
        return <EnergyAC />
      case AppViews.BOX_ENERGY_DC:
        return <EnergyDC />
      case AppViews.BOX_TANKS:
        return <Tanks />
      case AppViews.BOX_BATTERIES_OVERVIEW:
        return <BatteriesOverview />
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
