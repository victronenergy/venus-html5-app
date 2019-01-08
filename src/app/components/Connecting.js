import React from "react"
import Fade from "./Fade"

export default ({ viewUnmounting }) => (
  <main>
    <Fade unmount={viewUnmounting}>
      <div className="loading">
        <p className="text text--very-large">Connecting</p>
        <div className="loading__dots">
          <p className="dot">.</p>
          <p className="dot two">.</p>
          <p className="dot three">.</p>
        </div>
      </div>
    </Fade>
  </main>
)
