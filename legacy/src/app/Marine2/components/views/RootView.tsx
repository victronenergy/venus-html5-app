import React from "react"
import MainLayout from "../ui/MainLayout"
import EnergyOverview from "../boxes/EnergyOverview"

const RootView = () => {
  return (
    <MainLayout>
      <>
        <EnergyOverview />
      </>
    </MainLayout>
  )
}

export default RootView
