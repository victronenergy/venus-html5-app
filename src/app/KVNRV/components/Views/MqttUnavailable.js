import React from "react"
import Fade from "../../../MarineApp/components/Fade"

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
          <img src={require("../../../MarineApp/images/mqtt-settings-v2.42.png")} alt={"MQTT Settings Guide"}/>
        </div>
      </div>
    </Fade>
  </main>
)

export default MqttUnavailable;

