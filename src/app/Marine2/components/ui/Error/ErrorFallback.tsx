import React from "react"
import { Translate, translate } from "react-i18nify"
import { FallbackProps } from "react-error-boundary"
import { byteSize, isError } from "../../../../utils/util"
import * as Sentry from "@sentry/react"
import IconWarning from "../../../../MarineApp/images/icons/warning.svg"

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const size = isError(error) ? byteSize(error.stack + error.message) : byteSize(JSON.stringify(error))
  const queryParams = window.location.search.slice(1).replace(/=/g, "=").replace(/&/g, ", ")

  const sendError = () => {
    if (isError(error)) {
      Sentry.captureException(error)
    } else {
      Sentry.captureException({ info: JSON.stringify(error) })
    }
    Sentry.flush(2000).then(() => {
      // reload window after all errors have been sent
      window.location.reload()
    })
  }
  const restart = () => {
    window.location.reload()
  }

  const reset = () => {
    resetErrorBoundary()
  }

  return (
    <div className="error text--large">
      <div className="error-title">
        <img src={IconWarning} alt={"warning"} />
        <span>{translate("error.genericMessage")}</span>
      </div>
      <div className="error-subtitle">
        <span>{/*<Translate value="error.marine.hint" />*/}</span>
      </div>
      <div className="error-info">
        <Translate value="error.errorWithMessage" message={error.message || "Unknown"} />
        <div className="error-info-inside">
          <p>
            <Translate value="error.userAgent" userAgent={navigator.userAgent} />
          </p>
          <p>
            <Translate value="error.windowSize" width={window.innerWidth} height={window.innerHeight} />
          </p>
          <p>{Boolean(queryParams) && <Translate value="error.queryParams" queryParams={queryParams} />}</p>
        </div>
      </div>
      <div className="error-subtitle">
        <Translate value="error.marine.cta" />
      </div>
      <div className="error-data-charges">
        <span>
          <Translate value="error.marine.dataCharges" />
        </span>
        <span className="error-data-charges--estimate">{translate("error.marine.estimate", { size })}</span>
      </div>
      <div className="flex flex-row">
        <button className="mr-4 cursor-pointer rounded p-2 bg-victron-blue-dark" onClick={sendError}>
          {translate("error.marine.sendReport")}
        </button>
        <button className="mr-4 rounded bg-victron-blue dark:bg-victron-blue-dark p-1" onClick={reset}>
          Reset error
        </button>
        <button className="cursor-pointer rounded p-2 bg-victron-blue-dark" onClick={restart}>
          Restart app
        </button>
      </div>
    </div>
  )
}

export default ErrorFallback
