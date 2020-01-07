import React from "react"
import Fade from "../Fade"

export default ({ viewUnmounting }) => (
  <main>
    <Fade unmount={viewUnmounting}>
      <div className="error-page">
        <span className="text text--large">
          Could not connect to the MQTT server. <br />
          Please check that MQTT is enabled in your settings: <br />
          Remote Control > Settings > Services > MQTT on LAN (Plaintext)
        </span>
        <div className="image-container">
          <img src={require("../../../images/mqtt-settings-v2.42.png")} />
        </div>
      </div>
    </Fade>
  </main>
)
