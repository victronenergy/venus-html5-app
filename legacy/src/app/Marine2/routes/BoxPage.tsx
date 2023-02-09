import React, { useMemo } from "react"
import MainLayout from "../components/ui/MainLayout"
import { useParams } from "react-router-dom"
import NotFoundPage from "./NotFoundPage"

const EnergyAC = React.lazy(() => import("../components/boxes/EnergyAC"))
const EnergyDC = React.lazy(() => import("../components/boxes/EnergyDC"))

const BoxPage = () => {
  const params = useParams()
  const boxId = params?.boxId?.toLowerCase()

  const getBox = useMemo(() => {
    switch (boxId) {
      case "energy-ac":
        return <EnergyAC />
      case "energy-dc":
        return <EnergyDC />
      default:
        return <NotFoundPage />
    }
  }, [boxId])

  return <MainLayout>{getBox}</MainLayout>
}

export default BoxPage
