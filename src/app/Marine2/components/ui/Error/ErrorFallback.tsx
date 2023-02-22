import React from "react"
import { Translate, translate } from "react-i18nify"
import { FallbackProps } from "react-error-boundary"
import { byteSize, isError } from "../../../../utils/util"
import * as Sentry from "@sentry/react"
import WarningIcon from "../../../images/icons/warning.svg"
import Button from "../Button"

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
    <div className="w-full h-full flex flex-col items-center justify-center border-4 border-victron-red rounded-md p-4 text-black dark:text-white bg-white dark:bg-black">
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

        <div className="flex flex-row mt-3">
          <Button className="mr-4 w-full" size="md" onClick={sendError}>
            {translate("error.marine.sendReport")}
          </Button>
          {showReset && (
            <Button className="mx-2 w-full" size="md" onClick={reset}>
              {translate("error.marine.resetError")}
            </Button>
          )}
          <Button className="w-full" size="md" onClick={restart}>
            {translate("error.marine.restartApp")}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback
