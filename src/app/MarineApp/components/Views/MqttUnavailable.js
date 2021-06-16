import React from "react"
import Fade from "../../../components/Fade"
import MqttSettingsGuide from "../../images/mqtt-settings-v2.42.png"

const MqttUnavailable = ({ viewUnmounting }) => (
  <main>
    <Fade unmount={viewUnmounting}>
      <div className="error-page">
        <div className="instructions-container text--bold">
          Could not connect to the MQTT server. <br />
          Please check that MQTT is enabled in your settings: <br />
          <i>Remote Console &gt; Settings &gt; Services &gt; MQTT on LAN (Plaintext)</i> <br />
          Try using the Remote Console button at the top of this screen to change your settings remotely.
        </div>
        <div className="image-container">
          <img src={MqttSettingsGuide} alt={"MQTT Settings Guide"} />
        </div>
      </div>
    </Fade>
  </main>
)

export default MqttUnavailable
