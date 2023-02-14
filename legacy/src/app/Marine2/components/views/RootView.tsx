import React from "react"
import MainLayout from "../ui/MainLayout"
import EnergyAC from "../boxes/EnergyAC"
import EnergyDC from "../boxes/EnergyDC"
import Grid from "../ui/Grid"
import Tanks from "../boxes/Tanks/Tanks"

const RootView = () => {
  // TODO: replace this code with real data depending on the system type
  const getBoxes = (type: "simple" | "absolute") => {
    switch (type) {
      case "simple":
        return [
          <EnergyAC mode="compact" key={"energy-ac"} />,
          <EnergyDC mode="compact" key={"energy-dc"} />,
          <Tanks mode="compact" key={"tanks"} />,
        ]
      case "absolute":
        return [
          <EnergyAC mode="compact" key={"energy"} />,
          <EnergyDC mode="compact" key={"batteries"} />,
          <Tanks mode="compact" key={"tanks"} />,
        ]
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
