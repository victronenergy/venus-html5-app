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
        <p className="text--smaller">
          <Translate value="error.errorWithMessage" message={error} />
        </p>
        <p className="text--smaller">
          <Translate value="error.userAgent" userAgent={navigator.userAgent} />
        </p>
        <p className="text--smaller">
          <Translate value="error.windowSize" width={window.innerWidth} height={window.innerHeight} />
        </p>
        <p className="text--smaller">
          <Translate
            value="error.queryParams"
            queryParams={window.location.search.slice(1).replace(/=/g, "=").replace(/&/g, ", ")}
          />
        </p>
      </div>
    </div>
  )
}

export default Error
