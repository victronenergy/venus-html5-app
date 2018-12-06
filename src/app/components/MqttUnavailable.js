import React from "react"
import Fade from "./Fade"

export default props => (
  <main>
    <Fade unmount={props.viewUnmounting}>
      <div className="error-page">
        <span className="text text--large">
          Could not connect to the MQTT server. <br />
          Please check that MQTT is enabled in your settings: <br />
          Remote Console > Settings > Services > MQTT.
        </span>
        <div className="image-container">
          <img src={require("../../images/mqtt-settings.png")} />
        </div>
      </div>
    </Fade>
  </main>
)
