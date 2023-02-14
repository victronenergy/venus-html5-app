import React from "react"
import MainLayout from "../ui/MainLayout"
import Grid from "../ui/Grid"
import Tanks from "../boxes/Tanks/Tanks"
import EnergyOverview from "../boxes/EnergyOverview"

const RootView = () => {
  // TODO: replace this code with real data depending on the system type
  const getBoxes = (type: "simple" | "absolute") => {
    switch (type) {
      case "simple":
        return [<EnergyOverview mode="compact" key={"energy-overview"} />, <Tanks mode="compact" key={"tanks"} />]
      case "absolute":
        return [<EnergyOverview mode="compact" key={"energy-overview"} />, <Tanks mode="compact" key={"tanks"} />]
    }

    return []
  }

  return (
    <MainLayout>
      <Grid className={"gap-2"} flow={"col"}>
        {/* you can use different mocks to view the components layouts */}
        {/* TODO: replace this code with real data depending on the system type */}
        {getBoxes("simple").map((box, key) => box)}
      </Grid>
    </MainLayout>
  )
}

export default RootView
