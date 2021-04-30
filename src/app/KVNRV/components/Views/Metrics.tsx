import React, { Component } from "react"
import Battery from "../Battery"
import DcLoads from "../DcLoads"
import PvCharger from "../PvCharger"
import AcLoads from "../AcLoads"
import FreshWater from "../FreshWater"
import { Status } from "../Status"
import ShorePower from "../ShorePower"
import AcMode from "../AcMode"
import WasteWater from "../WasteWater"
import BlackWater from "../BlackWater"

export const STATUS_LEVELS = {
  SUCCESS: "success",
  WARNING: "warning",
  ALARM: "alarm",
}

export const STATUS_LEVELS_MSG = {
  [STATUS_LEVELS.SUCCESS]: "Optimal",
  [STATUS_LEVELS.WARNING]: "Warning",
  [STATUS_LEVELS.ALARM]: "Critical",
}

export type StatusUpdate = {
  part: string
  message: string
  level: string
}

type MetricsState = {
  status_updates: Array<StatusUpdate>
}

export interface CommonProps {
  addStatusUpdate: Function
  removeStatusUpdate: Function
}

export default class Metrics extends Component<{}, MetricsState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      status_updates: [],
    }
  }

  isUpdatePresent(su_part: string) {
    return this.state.status_updates.find((s) => s.part === su_part)
  }

  addStatusUpdate = (su: StatusUpdate) => {
    if (!this.isUpdatePresent(su.part)) {
      let sus = this.state.status_updates.slice()
      sus.push(su)
      this.setState({ status_updates: sus })
    }
  }

  removeStatusUpdate = (su_part: string) => {
    if (this.isUpdatePresent(su_part)) {
      let sus = this.state.status_updates.slice()
      sus = sus.splice(
        sus.findIndex((s) => s.part === su_part),
        1
      )
      this.setState({ status_updates: sus })
    }
  }

  render() {
    const commonProps: CommonProps = {
      addStatusUpdate: this.addStatusUpdate,
      removeStatusUpdate: this.removeStatusUpdate,
    }

    return (
      <div className="metrics-container">
        <div className="container">
          <div className={"row"}>
            <div className="col-span-4">
              <Status status_updates={this.state.status_updates} />

              <div className="row">
                <ShorePower {...commonProps} />
                <AcLoads {...commonProps} />
              </div>
            </div>

            <div className="col-span-4">
              <Battery {...commonProps} />

              <div className="row">
                <PvCharger {...commonProps} />
                <DcLoads {...commonProps} />
              </div>

              <AcMode {...commonProps} />
            </div>

            <div className="col-span-4">
              <FreshWater {...commonProps} />

              <div className="row">
                <WasteWater {...commonProps} />
                <BlackWater {...commonProps} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
