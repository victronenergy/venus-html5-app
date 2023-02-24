import React, { useEffect } from "react"
import MainLayout from "../ui/MainLayout"
import Grid from "../ui/Grid"
import Tanks from "../boxes/Tanks/Tanks"
import BatteriesOverview from "../boxes/BatteriesOverview"
import EnergyOverview from "../boxes/EnergyOverview"
import { useVisibleWidgetsStore } from "../../modules"
import { WIDGET_TYPES } from "../../utils/constants"
import { observer } from "mobx-react"

const RootView = () => {
  const visibleWidgetsStore = useVisibleWidgetsStore()

  const [boxes, setBoxes] = React.useState<JSX.Element[]>([])

  useEffect(() => {
    const boxes: JSX.Element[] = []
    visibleWidgetsStore.visibleElements.forEach((element) => {
      const elem = getBoxes(element)
      if (elem) {
        boxes.push(elem)
      }
    })

    setBoxes(boxes)
  }, [visibleWidgetsStore.visibleElements.size])

  const getBoxes = (type: string) => {
    switch (type) {
      case WIDGET_TYPES.ENERGY:
        return <EnergyOverview mode="compact" key={"energy-overview"} />
      case WIDGET_TYPES.TANK:
        return <Tanks mode="compact" key={"tanks"} />
      case WIDGET_TYPES.BATTERY:
        return <BatteriesOverview mode="compact" key={"batteries-overview"} />
      default:
        return null
    }
  }

  return (
    <>
      {/* TODO: add hidden boxes array and filter the visible boxes */}
      <div className="hidden">
        <BatteriesOverview mode="compact" key={"batteries-overview"} />
        <EnergyOverview mode="compact" key={"energy-overview"} />
        <Tanks mode="compact" key={"tanks"} />
      </div>
      {/* TODO: add loading indicator if boxes are empty */}
      <MainLayout>
        <Grid childClassName={"p-1"} flow={"col"}>
          {boxes.map((box) => box)}
        </Grid>
      </MainLayout>
    </>
  )
}

export default observer(RootView)
