import React from "react"
import { createHashRouter } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import NotFoundPage from "./NotFoundPage"

const RootPage = React.lazy(() => import("./RootPage"))
const BoxPage = React.lazy(() => import("./BoxPage"))

// We especially use hash router here, because we don't want to reload the whole app
// on every route change. We want to keep the state of the app and existing mqtt connections.
export const router = createHashRouter([
  // boxes overview routes
  {
    path: "/box/:boxId",
    element: (
      <React.Suspense fallback={<div>Loading</div>}>
        <BoxPage />
      </React.Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  // main page
  {
    path: "/",
    element: (
      <React.Suspense fallback={<div>Loading</div>}>
        <RootPage />
      </React.Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  // 404
  {
    path: "*",
    element: <NotFoundPage />,
  },
])
