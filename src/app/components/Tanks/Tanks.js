import React, { Component } from "react"
import MqttTopicWildcard from "../../mqtt/MqttTopicWildcard"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import { TANK_FLUID_TYPE } from "../../utils/constants"
import "./Tanks.scss"
import NumericValue from "../NumericValue"

const fluidTypeLevelLabel = {
  [TANK_FLUID_TYPE.FUEL]: "Fuel",
  [TANK_FLUID_TYPE.BLACK_WATER]: "Black water",
  [TANK_FLUID_TYPE.FRESH_WATER]: "Fresh water",
  [TANK_FLUID_TYPE.LIVE_WELL]: "Live well",
  [TANK_FLUID_TYPE.OIL]: "Oil",
  [TANK_FLUID_TYPE.WASTE_WATER]: "Waste water"
}

const Tank = props => (
  <div className={"metric__values tank__values"}>
    <p className={"text-smaller"}>{fluidTypeLevelLabel[props.fluidType]}</p>
    <NumericValue value={props.level} unit="%" />
  </div>
)

class TanksWithData extends Component {
  render() {
    const { portalId } = this.props
    if (!portalId) {
      return <Tanks />
    }
    return (
      <MqttTopicWildcard wildcard={`N/${portalId}/tank/+/DeviceInstance`}>
        {messages => {
          const tankIds = Object.values(messages).map(message => message.value)

          return (
            <div className={"metric metric__container metric__tanks"}>
              {tankIds.map(tankId => (
                <MqttSubscriptions
                  key={tankId}
                  topics={{
                    fluidType: `N/${portalId}/tank/${tankId}/FluidType`,
                    level: `N/${portalId}/tank/${tankId}/Level`
                  }}
                >
                  {topics => {
                    const { fluidType, level } = topics
                    return <Tank fluidType={fluidType.value} level={level.value} />
                  }}
                </MqttSubscriptions>
              ))}
            </div>
          )
        }}
      </MqttTopicWildcard>
    )
  }
}

export default TanksWithData
