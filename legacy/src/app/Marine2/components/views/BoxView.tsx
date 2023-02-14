import React, { useMemo } from "react"
import { AppViews } from "../../modules/AppViews"
import MainLayout from "../ui/MainLayout"

const EnergyOverview = React.lazy(() => import("../boxes/EnergyOverview"))

const BoxView = ({ boxId }: BoxViewProps) => {
  const getBox = useMemo(() => {
    switch (boxId) {
      case AppViews.BOX_ENERGY_OVERVIEW:
        return <EnergyOverview mode={"full"} />
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
