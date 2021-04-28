import { AppProps } from "../App"
import Header  from "../MarineApp/components/Header/Header"
import React from "react"
import { Metrics } from "./components/Views"

export const KVNRV = (props: AppProps) => {
  return (<>
    <Header />
    <Metrics />
  </>)
}
