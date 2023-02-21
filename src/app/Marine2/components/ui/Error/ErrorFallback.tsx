import React from "react"
import { Translate, translate } from "react-i18nify"
import { FallbackProps } from "react-error-boundary"
import { byteSize, isError } from "../../../../utils/util"
import * as Sentry from "@sentry/react"
import WarningIcon from "../../../images/icons/warning.svg"

interface Props extends FallbackProps {
  showReset?: boolean
}

const ErrorFallback = ({ error, resetErrorBoundary, showReset = false }: Props) => {
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
    <div className="w-full h-full flex flex-col items-center justify-center border-4 border-victron-red rounded-md p-4">
      <div>
        <div className="flex flex-col align-top mb-2">
          <div className="mb-1">
            {/* todo: fix types for svg */}
            {/* @ts-ignore */}
            <WarningIcon className="w-10 text-victron-red" alt={"warning"} />
          </div>
          <div>{translate("error.genericMessage")}</div>
        </div>

        <div className="text-sm py-2">
          <Translate value="error.errorWithMessage" message={error.message || "Unknown"} />
          <div className="error-info-inside">
            <p>{translate("error.userAgent", { userAgent: navigator.userAgent })}</p>
            <p>{translate("error.windowSize", { width: window.innerWidth, height: window.innerHeight })}</p>
            <p>{Boolean(queryParams) ? translate("error.queryParams", { queryParams }) : null}</p>
          </div>
        </div>

        <div className="">
          {translate("error.marine.cta")} {translate("error.marine.dataCharges")}{" "}
          {translate("error.marine.estimate", { size })}
        </div>

        <div className="flex flex-row mt-2">
          <button className="mr-8 cursor-pointer rounded p-2 bg-victron-blue-dark" onClick={sendError}>
            {translate("error.marine.sendReport")}
          </button>
          {showReset && (
            <button className="mx-4 rounded bg-victron-blue dark:bg-victron-blue-dark p-1" onClick={reset}>
              Reset error
            </button>
          )}
          <button className="cursor-pointer rounded p-2 bg-victron-blue-dark" onClick={restart}>
            Restart app
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback
