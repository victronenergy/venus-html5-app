import React from "react"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import HeaderView from "../../components/HeaderView"
import { ListRow, ListView } from "../../components/ListView"
import NumericValue from "../NumericValue/NumericValue"
import HidingContainer from "../../components/HidingContainer"

const getTopics = (portalId, deviceInstanceId) => {
  return {
    currentLimit: `N/${portalId}/charger/${deviceInstanceId}/Ac/In/CurrentLimit`,
    state: `N/${portalId}/charger/${deviceInstanceId}/State`,
    mode: `N/${portalId}/charger/${deviceInstanceId}/Mode`,
    nrOfOutputs: `N/${portalId}/charger/${deviceInstanceId}/NrOfOutputs`,
    current: [
      `N/${portalId}/charger/${deviceInstanceId}/Dc/0/Current`,
      `N/${portalId}/charger/${deviceInstanceId}/Dc/1/Current`,
      `N/${portalId}/charger/${deviceInstanceId}/Dc/2/Current`
    ],
    voltage: [
      `N/${portalId}/charger/${deviceInstanceId}/Dc/0/Voltage`,
      `N/${portalId}/charger/${deviceInstanceId}/Dc/1/Voltage`,
      `N/${portalId}/charger/${deviceInstanceId}/Dc/2/Voltage`
    ]
  }
}

const Charger = ({ nrOfOutputs, voltage, current, state }) => {
  const showAsList = nrOfOutputs > 1
  return showAsList ? (
    <ListView
      icon={require("../../../images/icons/multiplus.svg")}
      title={"Charger"}
      subTitle={`${nrOfOutputs} outputs`}
    >
      {voltage.map((v, i) => (
        <ListRow key={i}>
          <span className="text text--smaller">Output {i + 1}</span>
          <NumericValue value={v} unit="V" />
          <NumericValue value={current[i]} unit="A" precision={1} />
        </ListRow>
      ))}
    </ListView>
  ) : (
    <HeaderView icon={require("../../../images/icons/multiplus.svg")} title={"Charger"}>
      <NumericValue value={voltage[0]} unit="V" />
      <NumericValue value={current[0]} unit="A" precision={1} />
    </HeaderView>
  )
}

const ChargerWithData = ({ portalId, deviceInstanceId }) => (
  <HidingContainer>
    <MqttSubscriptions topics={getTopics(portalId, deviceInstanceId)}>
      {topics => <Charger {...topics} />}
    </MqttSubscriptions>
  </HidingContainer>
)

export default ChargerWithData
