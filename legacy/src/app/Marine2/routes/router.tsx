import React from "react"
import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import NotFoundPage from "./NotFoundPage"

const Root = React.lazy(() => import("./Root"))

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <React.Suspense fallback={<div>Loading</div>}>
          <Root />
        </React.Suspense>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
  { basename: "/app" }
)
