import PropTypes from "prop-types"
import { Component } from "react"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import React from "react"

export const BatteryName = props => {
  const productName = props.customName || props.productName
  let label
  if (props.batteryChannel === 0) {
    label = productName || "Battery"
  }
  if (props.batteryChannel === 1) {
    label = productName ? productName + " starter" : "Starter battery"
  }

  if (props.main) {
    return <>{label}</>
  } else {
    return (
      <>
        {label} ({props.index})
      </>
    )
  }
}

BatteryName.propTypes = {
  customName: PropTypes.string,
  productName: PropTypes.string,
  batteryChannel: PropTypes.number.isRequired,
  main: PropTypes.bool
}

const getTopics = (portalId, batteryInstanceId) => {
  return {
    productName: `N/${portalId}/battery/${batteryInstanceId}/ProductName`,
    customName: `N/${portalId}/battery/${batteryInstanceId}/CustomName`
  }
}

class BatteryNameWithData extends Component {
  render() {
    const { portalId, batteryInstanceId, batteryChannel, ...rest } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId, batteryInstanceId)}>
        {topics => {
          return (
            <BatteryName
              productName={topics.productName.value}
              customName={topics.customName.value}
              batteryChannel={batteryChannel}
              {...rest}
            />
          )
        }}
      </MqttSubscriptions>
    )
  }
}

BatteryNameWithData.propTypes = {
  portalId: PropTypes.string.isRequired,
  batteryInstanceId: PropTypes.string.isRequired,
  batteryChannel: PropTypes.number.isRequired
}

export default BatteryNameWithData
