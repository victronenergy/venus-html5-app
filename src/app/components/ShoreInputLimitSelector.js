import React, { Component } from "react"
import Logger from "../../logging/logger"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"
import MqttWriteValue from "../mqtt/MqttWriteValue"
import GetShorePowerInputNumber from "../mqtt/victron/GetShorePowerInputNumber"

const USAmperage = [10, 15, 20, 30, 50, 100]
const EUAmperage = [6, 10, 13, 16, 25, 32, 63]

const getTopics = (portalId, vebusInstanceId, shorePowerInput) => {
  return {
    currentLimit: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`,
    currentLimitMax: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimitGetMax`,
    productId: `N/${portalId}/vebus/${vebusInstanceId}/ProductId`
  }
}

class ShoreInputLimitSelector extends Component {
  state = {
    showEmpties: false
  }

  firstSelectorButtonNode = null
  amperageContainerNode = null

  /**
   * - Mask the Product id with `0xFF00`
   * - If the result is `0x1900` or `0x2600` it is an EU model (230VAC)
   * - If the result is `0x2000` or `0x2700` it is an US model (120VAC)
   */
  getSuggestedAmperageValuesList(productId) {
    const result = productId & 0xff00
    if (result === 0x1900 || result === 0x2600) {
      return EUAmperage
    } else if (result === 0x2000 || result === 0x2700) {
      return USAmperage
    } else {
      Logger.warn(`Could not retrieve amperage US/EU for product id ${productId}`)
      return USAmperage
    }
  }

  componentDidMount() {
    const container = this.amperageContainerNode
    const selectorButton = this.firstSelectorButtonNode
    const showEmpties = container && selectorButton && container.clientHeight > selectorButton.clientHeight * 2
    this.setState({ showEmpties: showEmpties })
  }

  render() {
    const maxLimit = this.props.maxLimit || 100
    const amperageList = this.getSuggestedAmperageValuesList(this.props.productId).filter(value => {
      return value <= maxLimit
    })
    const currentlySelectedLimit = parseInt(this.props.currentLimit)

    return (
      <div className="amperage-selector__container">
        <div className="amperage-selector" ref={node => (this.amperageContainerNode = node)}>
          <div className="text text--large text--center amperage-selector__description">Select shore input limit</div>
          {amperageList.map((currentValue, index) => {
            return (
              <button
                key={currentValue}
                className={
                  "selector-button selector-button__amperage text text--very-large" +
                  (currentlySelectedLimit == currentValue ? " selector-button--active" : "")
                }
                onClick={() => this.props.onLimitSelected(currentValue)}
                ref={node => (index === 0 ? (this.firstSelectorButtonNode = node) : null)}
              >
                {currentValue}A
              </button>
            )
          })}

          {// Add these to "cheat" the flexbox and allow center alignment of selector buttons
          // AND left alignment to the last row of buttons if multilined
          this.state.showEmpties && amperageList.map(amperage => <div className="empty" key={amperage} />)}
        </div>
      </div>
    )
  }
}

class ShoreInputLimitSelectorWithData extends Component {
  render() {
    const { portalId, vebusInstanceId } = this.props
    if (!portalId || !vebusInstanceId) {
      return <div>Loading..</div>
    }
    return (
      <GetShorePowerInputNumber portalId={portalId}>
        {shorePowerInput => {
          if (!shorePowerInput) {
            return <div>Loading...</div>
          }
          return (
            // Only available for VE.Bus versions > 415
            <MqttSubscriptions topics={getTopics(portalId, vebusInstanceId, shorePowerInput)}>
              {topics => {
                return (
                  <MqttWriteValue topic={`W/${portalId}/vebus/${vebusInstanceId}/Mode`}>
                    {(isConnected, updateLimitSelected) => {
                      return (
                        <ShoreInputLimitSelector
                          currentLimit={topics.currentLimit.value}
                          maxLimit={topics.currentLimitMax.value}
                          productId={topics.productId.value}
                          onLimitSelected={value => {
                            updateLimitSelected(value)
                            this.props.onLimitSelected()
                          }}
                        />
                      )
                    }}
                  </MqttWriteValue>
                )
              }}
            </MqttSubscriptions>
          )
        }}
      </GetShorePowerInputNumber>
    )
  }
}
export default ShoreInputLimitSelectorWithData
