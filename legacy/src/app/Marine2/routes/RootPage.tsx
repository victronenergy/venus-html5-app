import React from "react"
import MainLayout from "../components/ui/MainLayout"
import Box from "../components/ui/Box"
import EnergyAC from "../components/boxes/EnergyAC"
import EnergyDC from "../components/boxes/EnergyDC"

const RootPage = () => {
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
