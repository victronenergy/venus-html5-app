import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Something went wrong</h1>
      <div>
        <a href={"/app"}>Back to the main page</a>
      </div>
      <p>
        <i>{(error as any).statusText || (error as any).message || "Unknown error"}</i>
      </p>
    </div>
  )
}
