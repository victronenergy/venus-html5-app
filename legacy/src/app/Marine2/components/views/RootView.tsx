import React from "react"
import MainLayout from "../ui/MainLayout"
import EnergyAC from "../boxes/EnergyAC"
import EnergyDC from "../boxes/EnergyDC"
import BatteriesOverview from "../boxes/BatteriesOverview"

const RootView = () => {
  return (
    <MainLayout>
      <>
        <EnergyAC mode="compact" className={"mb-2"} />
        <EnergyDC mode="compact" />
        <BatteriesOverview mode="compact" />
      </>
    </MainLayout>
  )
}

export default RootView
