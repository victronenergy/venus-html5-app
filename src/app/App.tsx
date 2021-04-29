import '../css/index.scss'
import React from "react"
import Loading from "./components/Loading"

const KVNRV = React.lazy(() => import('./KVNRV'));
const MarineApp = React.lazy(() => import('./MarineApp'));

export type AppProps = {
  host: string
  port: number
}

const App = (props: AppProps) => {
    const whitelabel = "KVNRV";

    if (whitelabel === "KVNRV") {
        return (
          <React.Suspense fallback={<Loading />} >
            <KVNRV {...props} />
          </React.Suspense>
        )
    } else {
        return (
          <React.Suspense fallback={<Loading />} >
              <MarineApp {...props} />
          </React.Suspense>
        )
    }
}

export default App;
