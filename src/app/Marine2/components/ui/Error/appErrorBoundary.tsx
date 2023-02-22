import { ErrorBoundaryProps } from "react-error-boundary"
import ErrorFallback from "./ErrorFallback"

export const appErrorBoundaryProps: ErrorBoundaryProps = {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.error("-> error", error)
    console.info("-> info", info)
  },
}
