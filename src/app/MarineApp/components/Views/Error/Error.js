import { Translate } from "react-i18nify"

import "./Error.scss"
import IconWarning from "../../../images/icons/warning.svg"
import SelectorButton from "../../SelectorButton"
import { byteSize, isError } from "app/utils/util"
import * as Sentry from "@sentry/react"

const Error = ({ error, ignoreButton = false, handleIgnore = () => {} }) => {
  const size = isError(error) ? byteSize(error.stack + error.message) : byteSize(JSON.stringify(error))

  const sendError = () => {
    const previousUiBreadcrumbs = error.breadcrumbs ? error.breadcrumbs.filter((b) => b.category.includes("ui")) : []
    previousUiBreadcrumbs.forEach((breadCrumb) =>
      Sentry.addBreadcrumb({ ...breadCrumb, data: { trueTimestamp: breadCrumb.timestamp } })
    )

    // we need this custom text to pass by the Sentry `beforeSend` hook
    const captureContext = {
      tags: {
        sendError: true,
      },
    }

    if (isError(error)) {
      Sentry.captureException(error, captureContext)
    } else {
      Sentry.captureException({ info: JSON.stringify(error) }, captureContext)
    }
    // reload window after all errors have been sent
    Sentry.flush().then(() => {
      window.location.reload()
    })
  }

  return (
    <div className="error text--large">
      <div className="error-title">
        <img src={IconWarning} alt={"warning"} />
        <span>
          <Translate value="error.marine.title" />
        </span>
      </div>
      <div className="error-subtitle">
        <span>
          <Translate value="error.marine.hint" />
        </span>
      </div>
      <div className="error-info">
        <div className="error-info-inside">
          <p>
            <Translate value="error.userAgent" userAgent={navigator.userAgent} />
          </p>
          <p>
            <Translate value="error.windowSize" width={window.innerWidth} height={window.innerHeight} />
          </p>
          <p>
            <Translate
              value="error.queryParams"
              queryParams={window.location.search.slice(1).replace(/=/g, "=").replace(/&/g, ", ")}
            />
          </p>
        </div>
      </div>
      <div className="error-subtitle">
        <Translate value="error.marine.cta" />
      </div>
      <div className="error-data-charges">
        <span>
          <Translate value="error.marine.dataCharges" />
        </span>
        <span className="error-data-charges--estimate">
          <Translate value="error.marine.estimate" size={size} />
        </span>
      </div>
      <div className="error-send-report">
        <SelectorButton alwaysUnlocked active onClick={sendError}>
          <Translate value="error.marine.sendReport" />
        </SelectorButton>
        {ignoreButton && (
          <SelectorButton onClick={handleIgnore}>
            <Translate value="error.marine.ignore" />
          </SelectorButton>
        )}
      </div>
    </div>
  )
}

export default Error
