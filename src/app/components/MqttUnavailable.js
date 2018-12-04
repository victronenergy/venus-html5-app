import React from "react"

export default props => (
  <div className="main__container">
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
  </div>
)
