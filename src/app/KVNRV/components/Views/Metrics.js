import React, { Component } from "react"
import Battery from "../Battery"
import DcLoads from "../DcLoads"
import PvCharger from "../PvCharger"
import AcLoads from "../AcLoads"
import FreshWater from "../FreshWater"
import Status from "../Status"
import ShorePower from "../ShorePower"
import AcMode from "../AcMode"
import WasteWater from "../WasteWater"
import BlackWater from "../BlackWater"
import '../../css/metrics.scss'


export default class Metrics extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {

  }

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
              <Battery  />

              <div className="row">
                <PvCharger />
                <DcLoads />
              </div>

              <AcMode />
            </div>

            <div className="col-span-4">
              <FreshWater />

              <div className="row">
                <WasteWater />
                <BlackWater />
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
