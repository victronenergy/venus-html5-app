import React, { useMemo } from "react"
import { translate } from "react-i18nify"
import { FallbackProps } from "react-error-boundary"
import { byteSize, isError } from "../../../../utils/util"
import * as Sentry from "@sentry/react"
import WarningIcon from "../../../images/icons/warning.svg"
import Button from "../Button"
import { useErrorHandlerStore } from "../../../../components/ErrorHandlerModule/ErrorHandler.store"
import { Breadcrumb } from "@sentry/react"

interface Props extends FallbackProps {
  showReset?: boolean
}

const ErrorFallback = ({ error, resetErrorBoundary, showReset = false }: Props) => {
  const errorHandlerStore = useErrorHandlerStore()
  const event = errorHandlerStore.error || error

  const size = useMemo(() => {
    return byteSize(JSON.stringify(event))
    // we need to calculate the size of the error object only once, because after sending it to Sentry
    // it will be cleared from the store and we will get a zero size
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const queryParams = window.location.search.slice(1).replace(/=/g, "=").replace(/&/g, ", ")

  const [isErrorSent, setIsErrorSent] = React.useState(false)

  const sendError = async () => {
    // we need this custom text to pass by the Sentry `beforeSend` hook
    const captureContext = {
      tags: {
        sendError: true,
      },
    }

    if (isError(event)) {
      Sentry.captureException(event, captureContext)
    } else {
      Sentry.captureException({ info: JSON.stringify(error) }, captureContext)
    }

    const previousUiBreadcrumbs = event.breadcrumbs
      ? event.breadcrumbs.filter((b: Breadcrumb) => b.category?.includes("ui"))
      : []

    previousUiBreadcrumbs.forEach((breadCrumb: Breadcrumb) =>
      Sentry.addBreadcrumb({ ...breadCrumb, data: { trueTimestamp: breadCrumb.timestamp } })
    )

    Sentry.flush().then(() => {
      errorHandlerStore.setError(null)
      setIsErrorSent(true)
    })
  }
  const restart = () => {
    window.location.reload()
  }

  const reset = () => {
    resetErrorBoundary()
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center border-4 border-victron-red rounded-md px-4 py-6 text-black dark:text-white bg-white dark:bg-black">
      <div className="flex flex-col justify-between h-full text-sm">
        <div className="mb-1 self-center grow">
          {/* todo: fix types for svg */}
          {/* @ts-ignore */}
          <WarningIcon className="w-12 text-victron-red" alt={"warning"} />
        </div>
        <div className="flex flex-col align-top mb-2">
          <div>{translate("error.genericMessage")}</div>
        </div>

        <div className="py-2 text-xs">
          <p>{translate("error.errorWithMessage", { message: error.message || "Unknown" })}</p>
          <p>{translate("error.userAgent", { userAgent: navigator.userAgent })}</p>
          <p>{translate("error.windowSize", { width: window.innerWidth, height: window.innerHeight })}</p>
          <p>{Boolean(queryParams) ? translate("error.queryParams", { queryParams }) : null}</p>
        </div>

        <div className="grow">
          {translate("error.marine.cta")} {translate("error.marine.dataCharges")}{" "}
          {translate("error.marine.estimate", { size })}
        </div>

        <div className="flex flex-row mt-3">
          {isErrorSent ? (
            <Button className="mr-4 w-full" size="md" disabled>
              {translate("error.marine.reportSent")}
            </Button>
          ) : (
            <Button className="mr-4 w-full" size="md" onClick={sendError}>
              {translate("error.marine.sendReport")}
            </Button>
          )}
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
