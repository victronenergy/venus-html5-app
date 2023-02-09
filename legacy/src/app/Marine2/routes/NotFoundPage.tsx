import React from "react"

export default function NotFoundPage() {
  return (
    <div id="error-page">
      <h1>The requested page doesn't exist</h1>
      <div>
        <a href={"/app"}>Back to the main page</a>
      </div>
    </div>
  )
}
