import React, { Component } from "react"

import GetShorePowerInputNumber from "../../../mqtt/victron/GetShorePowerInputNumber"
import MqttSubscriptions from "../../../mqtt/MqttSubscriptions"
import MqttWriteValue from "../../../mqtt/MqttWriteValue"
import SelectorButton from "../SelectorButton"

import Logger from "../../../utils/logger"

const USAmperage = [10, 15, 20, 30, 50, 100]
const EUAmperage = [6, 10, 13, 16, 25, 32, 63]

const getTopics = (portalId, vebusInstanceId, shorePowerInput) => {
  return {
    currentLimit: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimit`,
    currentLimitMax: `N/${portalId}/vebus/${vebusInstanceId}/Ac/In/${shorePowerInput}/CurrentLimitGetMax`,
    productId: `N/${portalId}/vebus/${vebusInstanceId}/ProductId`,
  }
}

class InputLimitSelector extends Component {
  state = {
    showEmpties: false,
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
      Logger.warn(`Could not determine amperage US/EU for product id ${productId}`)
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
    const { currentLimitMax = 100, productId, currentLimit, onLimitSelected } = this.props
    const amperageList = this.getSuggestedAmperageValuesList(productId).filter((value) => {
      return value <= currentLimitMax
    })
    const currentlySelectedLimit = parseInt(currentLimit)

    return (
      <div className="amperage-selector__container">
        <div className="amperage-selector" ref={(node) => (this.amperageContainerNode = node)}>
          <div className="text text--large text--center amperage-selector__description">Select shore input limit</div>
          {amperageList.map((currentValue, index) => {
            return (
              <SelectorButton
                key={currentValue}
                className={"selector-button__amperage text--very-large"}
                active={currentlySelectedLimit === currentValue}
                onClick={() => onLimitSelected(currentValue)}
                ref={(node) => (index === 0 ? (this.firstSelectorButtonNode = node) : null)}
                large
              >
                {currentValue}A
              </SelectorButton>
            )
          })}

          {
            // Add these to "cheat" the flexbox and allow center alignment of selector buttons
            // AND left alignment to the last row of buttons if multilined
            this.state.showEmpties && amperageList.map((amperage) => <div className="empty" key={amperage} />)
          }
        </div>
      </div>
    )
  }
}

class InputLimitSelectorWithData extends Component {
  render() {
    const { portalId, inverterChargerDeviceId, onLimitSelected } = this.props
    if (!portalId || !inverterChargerDeviceId) {
      return <div>Loading..</div>
    }
    return (
      <GetShorePowerInputNumber portalId={portalId}>
        {(shorePowerInput) => {
          if (!shorePowerInput) {
            return <div>Loading...</div>
          }
          return (
            // Only available for VE.Bus versions > 415
            <MqttSubscriptions topics={getTopics(portalId, inverterChargerDeviceId, shorePowerInput)}>
              {(topics) => {
                return (
                  <MqttWriteValue
                    topic={`W/${portalId}/vebus/${inverterChargerDeviceId}/Ac/In/${shorePowerInput}/CurrentLimit`}
                  >
                    {(_, updateLimitSelected) => {
                      return (
                        <InputLimitSelector
                          {...topics}
                          onLimitSelected={(value) => {
                            updateLimitSelected(value)
                            onLimitSelected()
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
export default InputLimitSelectorWithData
