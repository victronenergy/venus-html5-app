import React from "react"

import "./Error.scss"
import "../../../../css/texts.scss"

export default () => {
  return (
    <div className="error text--large">
      <div>
        <p>
          An error occurred while rendering the application. Try reloading the page or contacting Victron Energy with
          the following information:
        </p>
        <p className="text--smaller">{`User agent: ${navigator.userAgent}`}</p>
        <p className="text--smaller">{`Window: ${window.innerWidth} x ${window.innerHeight}`}</p>
        <p className="text--smaller">{`Query params: ${window.location.search
          .slice(1)
          .replace(/=/g, "=")
          .replace(/&/g, ", ")}`}</p>
      </div>
    </div>
  )
}
