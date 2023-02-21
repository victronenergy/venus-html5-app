import React from "react"
import { Translate } from "react-i18nify"
import Fade from "../../../components/Fade"
import MqttSettingsGuide from "../../images/mqtt-settings-v2.42.png"

const MqttUnavailable = ({ viewUnmounting }) => (
  <main>
    <Fade unmount={viewUnmounting}>
      <div className="error-page">
        <div className="instructions-container text--bold">
          <Translate value="error.mqttUnavailable1" /> <br />
          <Translate value="error.mqttUnavailable2" /> <br />
          <i>
            <Translate value="error.mqttUnavailable3" />
          </i>
          <br />
          <Translate value="error.mqttUnavailable4" />
        </div>
        <div className="image-container">
          <img src={MqttSettingsGuide} alt={"MQTT Settings Guide"} />
        </div>
      </div>
    </Fade>
  </main>
)

export default MqttUnavailable
