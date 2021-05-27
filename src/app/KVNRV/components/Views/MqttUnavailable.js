import React from "react"
import Fade from "../../../components/Fade"
import MqttSettingsGuide from "../../images/mqtt-settings-v2.42.png"

const MqttUnavailable = () => (
  <main>
    <Fade>
      <div className="error-page">
        <div className="instructions-container text--bold">
          Could not connect to the MQTT server. <br />
          Please check that MQTT is enabled in your settings: <br />
          <i>Remote Console &gt; Settings &gt; Services &gt; MQTT on LAN (Plaintext)</i> <br />
          Try using the Remote Console button at the top of this screen to change your settings remotely. <br />
          You can also try connecting to your device remotely by selecting Remote from the menu above.
        </div>
        <div className="image-container">
          <img src={MqttSettingsGuide} alt={"MQTT Settings Guide"} />
        </div>
      </div>
    </Fade>
  </main>
)

export default MqttUnavailable
