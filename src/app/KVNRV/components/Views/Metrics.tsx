import React, { Component } from "react"
import Battery from "../Battery"
import DcLoads from "../DcLoads"
import PvCharger from "../PvCharger"
import AcLoads from "../AcLoads"
import Tanks from "../Tanks"
import { Status } from "../Status"
import ShorePower from "../ShorePower"
import AcMode from "../AcMode"

export class Metrics extends Component<any, any> {
  render() {
    return (
      <div className="metrics-container">
        <div className="container">
          <div className={"row"}>
            <div className="col-span-4">
              <Status />

              <div className="row">
                <ShorePower />
                <AcLoads />
              </div>
            </div>

            <div className="col-span-4">
              <Battery />

              <div className="row">
                <PvCharger />
                <DcLoads />
              </div>

              <AcMode />
            </div>

            <Tanks />
          </div>
        </div>
      </div>
    )
  }
}

export default Metrics
