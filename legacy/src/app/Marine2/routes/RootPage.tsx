import React from "react"
import MainLayout from "../components/ui/MainLayout"
import EnergyAC from "../components/boxes/EnergyAC"
import EnergyDC from "../components/boxes/EnergyDC"

const RootPage = () => {
  return (
    <MainLayout>
      <>
        <EnergyAC mode="compact" className={"mb-2"} />
        <EnergyDC mode="compact" />
      </>
    </MainLayout>
  )
}

export default RootPage
