import React, { useEffect, useState } from "react"
import MainLayout from "../ui/MainLayout"
import Tanks from "../boxes/Tanks/Tanks"
import BatteriesOverview from "../boxes/BatteriesOverview"
import EnergyOverview from "../boxes/EnergyOverview"
import GridPaginator from "../ui/GridPaginator"
import { useVisibleWidgetsStore } from "../../modules"
import { observer } from "mobx-react"
import { PageSelectorProps } from "../ui/PageSelector"
import DevicesOverview from "../boxes/DevicesOverview"
import EnvironmentOverview from "../boxes/EnvironmentOverview/EnvironmentOverview"
import { BOX_TYPES } from "../../utils/constants/generic"

const RootView = () => {
  const visibleWidgetsStore = useVisibleWidgetsStore()

  const [boxes, setBoxes] = React.useState<JSX.Element[]>([])
  const [initialBoxes, setInitialBoxes] = React.useState<JSX.Element[]>([])

  useEffect(() => {
    const visibleBoxes: JSX.Element[] = []
    const hiddenBoxes: JSX.Element[] = []
    for (const type of Object.values(BOX_TYPES)) {
      const isVisible = visibleWidgetsStore.visibleElements.has(type)

      const elem = getBoxByType(type)
      if (!elem) continue

      if (isVisible) {
        visibleBoxes.push(elem)
      } else {
        hiddenBoxes.push(elem)
      }
    }

    setBoxes(visibleBoxes)
    setInitialBoxes(hiddenBoxes)
  }, [visibleWidgetsStore.visibleElements])

  const getBoxByType = (type: BOX_TYPES) => {
    switch (type) {
      case BOX_TYPES.ENERGY:
        return <EnergyOverview componentMode="compact" key="energy-overview" />
      case BOX_TYPES.TANKS:
        return <Tanks componentMode="compact" key="tanks" />
      case BOX_TYPES.BATTERIES:
        return <BatteriesOverview componentMode="compact" key="batteries-overview" />
      case BOX_TYPES.DEVICES:
        return <DevicesOverview componentMode="compact" key="devices-overview" />
      case BOX_TYPES.ENVIRONMENT:
        return <EnvironmentOverview componentMode="compact" key="environment-overview" />
      default:
        return null
    }
  }

  const [pageSelectorProps, setPageSelectorProps] = useState<PageSelectorProps>()

  return (
    <>
      {/* We need to have hidden boxes mounted to listen to mqtt data and manage boxes visibility */}
      <div className="hidden">{initialBoxes.map((box) => box)}</div>
      {/* TODO: remake this to use store states instead of pageSelectorProps down the tree */}
      <MainLayout pageSelectorProps={pageSelectorProps}>
        <GridPaginator
          perPage={4}
          flow="col"
          orientation="horizontal"
          childClassName="p-1"
          pageSelectorPropsSetter={setPageSelectorProps}
        >
          {boxes.map((box) => box)}
        </GridPaginator>
      </MainLayout>
    </>
  )
}

export default observer(RootView)
