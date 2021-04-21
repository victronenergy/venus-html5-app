import React, { Component } from "react"
import Battery from "../Battery"
import DcLoads from "../DcLoads"
import PvCharger from "../PvCharger"
// import ActiveSource from "../ActiveSource"
// import AcLoads from "../AcLoads"
// import Chargers from "../Chargers"
// import Inverters from "../Inverters"
// import Generators from "../Generators"
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
        <PvCharger />
        <DcLoads  />
        <Battery  />

        {/*<AcLoads />*/}
        {/*<ActiveSource />*/}
        {/*<Chargers />*/}
        {/*<Inverters />*/}
        {/*<Generators />*/}
      </div>
    )
  }
}
