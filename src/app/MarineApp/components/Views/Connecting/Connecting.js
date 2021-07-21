import React from "react"
import { Translate } from "react-i18nify"

import Fade from "../../../../components/Fade"

import "./Connecting.scss"

const Connecting = ({ viewUnmounting }) => (
  <main>
    <Fade unmount={viewUnmounting}>
      <div className="connecting">
        <p className="text text--very-large">
          <Translate value="header.connecting" />
        </p>
        <div className="connecting__dots">
          <p className="dot">.</p>
          <p className="dot two">.</p>
          <p className="dot three">.</p>
        </div>
      </div>
    </Fade>
  </main>
)

export default Connecting
