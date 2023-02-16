import React from "react"
import MainLayout from "../ui/MainLayout"
import Grid from "../ui/Grid"
import Tanks from "../boxes/Tanks/Tanks"
import BatteriesOverview from "../boxes/BatteriesOverview"
import EnergyOverview from "../boxes/EnergyOverview"

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
      <Grid childClassName={"p-1"} flow={"col"}>
        {/* you can use different mocks to view the components layouts */}
        {/* TODO: replace this code with real data depending on the system type */}
        {getBoxes("simple").map((box, key) => box)}
      </Grid>
    </MainLayout>
  )
}

export default RootView
