import React from "react"
import Fade from "../Fade"

export default ({ viewUnmounting }) => (
  <main>
    <Fade unmount={viewUnmounting}>
      <div className="error-page">
        <div className="instructions-container text--bold">
          Could not connect to the MQTT server. <br />
          Please check that MQTT is enabled in your settings: <br />
          <i>Remote Control > Settings > Services > MQTT on LAN (Plaintext)</i> <br />
          Try using the Remote Console button at the top of this screen to change your settings remotely.
        </div>
        <div className="image-container">
          <img src={require("../../../images/mqtt-settings-v2.42.png")} />
        </div>
      </div>
    </Fade>
  </main>
)
