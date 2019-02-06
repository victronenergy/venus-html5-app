import React from "react"

import Fade from "../../Fade"

import "./Connecting.scss"

export default ({ viewUnmounting }) => (
  <main>
    <Fade unmount={viewUnmounting}>
      <div className="connecting">
        <p className="text text--very-large">Connecting</p>
        <div className="connecting__dots">
          <p className="dot">.</p>
          <p className="dot two">.</p>
          <p className="dot three">.</p>
        </div>
      </div>
    </Fade>
  </main>
)
