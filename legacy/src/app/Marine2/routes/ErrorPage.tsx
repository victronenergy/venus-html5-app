import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError() as Error
  console.error(error)

  return (
    <div id="error-page">
      <h1>Something went wrong</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = "/app")} className={"rounded p-2"}>
        Click here to reload the app
      </button>
    </div>
  )
}
