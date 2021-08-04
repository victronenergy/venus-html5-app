import React from "react"
import { Translate } from "react-i18nify"

import "./Error.scss"

const Error = ({ error }: { error?: any }) => {
  return (
    <div className="error text--large">
      <div>
        <p>
          <Translate value="error.genericMessage" />
        </p>
        <p className="text--smaller">{`Error: ${error}`}</p>
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

export default Error
