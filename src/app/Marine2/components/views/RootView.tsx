import React from "react"
import MainLayout from "../ui/MainLayout"
import Tanks from "../boxes/Tanks/Tanks"
import BatteriesOverview from "../boxes/BatteriesOverview"
import EnergyOverview from "../boxes/EnergyOverview"
import GridPaginator from "../ui/GridPaginator"

const RootView = () => {
  // TODO: replace this code with real data depending on the system type
  const getBoxes = (type: "simple" | "absolute") => {
    switch (type) {
      case "simple":
        return [
          <EnergyOverview mode="compact" key={"energy-overview"} />,
          <Tanks mode="compact" key={"tanks"} />,
          <BatteriesOverview mode="compact" key={"batteries-overview"} />,
        ]
      case "absolute":
        return [
          <EnergyOverview mode="compact" key={"energy-overview"} />,
          <Tanks mode="compact" key={"tanks"} />,
          <BatteriesOverview mode="compact" key={"batteries-overview"} />,
        ]
    }

    return []
  }

  return (
    <MainLayout>
      <GridPaginator
        childrenPerPage={4}
        childClassName={"p-1"}
        flow={"col"}
        orientation={"horizontal"}
        selectorLocation={"bottom-full"}
      >
        {/* you can use different mocks to view the components layouts */}
        {/* TODO: replace this code with real data depending on the system type */}
        {getBoxes("simple").map((box, key) => box)}
      </GridPaginator>
    </MainLayout>
  )
}

export default RootView
