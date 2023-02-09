import React from "react"
import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import NotFoundPage from "./NotFoundPage"
import BoxPage from "./BoxPage"

const RootPage = React.lazy(() => import("./RootPage"))

export const router = createBrowserRouter(
  [
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
  ],
  { basename: "/app" }
)
