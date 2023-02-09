import React from "react"
import MainLayout from "../components/ui/MainLayout"
import EnergyAC from "../components/boxes/EnergyAC"
import EnergyDC from "../components/boxes/EnergyDC"

const RootPage = () => {
  console.log("-> root page")
  return (
    <MainLayout>
      <>
        <EnergyAC mode="compact" />
        <EnergyDC mode="compact" />
      </>
    </MainLayout>
  )
}

export default RootPage
