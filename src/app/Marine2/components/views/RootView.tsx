import React, { useEffect } from "react"
import MainLayout from "../ui/MainLayout"
import Grid from "../ui/Grid"
import Tanks from "../boxes/Tanks/Tanks"
import BatteriesOverview from "../boxes/BatteriesOverview"
import EnergyOverview from "../boxes/EnergyOverview"
import { useVisibleWidgetsStore } from "../../modules"
import { BoxTypes } from "../../utils/constants"
import { observer } from "mobx-react"

const RootView = () => {
  const visibleWidgetsStore = useVisibleWidgetsStore()

  const [boxes, setBoxes] = React.useState<JSX.Element[]>([])
  const [initialBoxes, setInitialBoxes] = React.useState<JSX.Element[]>([])

  useEffect(() => {
    const visibleBoxes: JSX.Element[] = []
    const hiddenBoxes: JSX.Element[] = []
    for (const type of Object.values(BoxTypes)) {
      const elem = getBoxes(type)
      if (!elem) continue

      if (visibleWidgetsStore.visibleElements.has(type)) {
        visibleBoxes.push(elem)
      } else {
        hiddenBoxes.push(elem)
      }
    }

    setBoxes(visibleBoxes)
    setInitialBoxes(hiddenBoxes)
  }, [visibleWidgetsStore.visibleElements.size])

  const getBoxes = (type: BoxTypes) => {
    switch (type) {
      case BoxTypes.ENERGY:
        return <EnergyOverview mode="compact" key={"energy-overview"} />
      case BoxTypes.TANKS:
        return <Tanks mode="compact" key={"tanks"} />
      case BoxTypes.BATTERIES:
        return <BatteriesOverview mode="compact" key={"batteries-overview"} />
      default:
        return null
    }
  }

  return (
    <>
      {/* We need to have hidden boxes mounted to listen to mqtt data and manage boxes visibility */}
      <div className="hidden">{initialBoxes.map((box) => box)}</div>
      <MainLayout>
        <Grid childClassName={"p-1"} flow={"col"}>
          {boxes.map((box) => box)}
        </Grid>
      </MainLayout>
    </>
  )
}

export default observer(RootView)
