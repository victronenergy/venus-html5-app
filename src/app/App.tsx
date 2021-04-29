import '../css/index.scss'
import React from "react"

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
          <React.Suspense fallback={() => (<div>Suspense</div>)}>
              <KVNRV {...props} />
          </React.Suspense>
        )
    } else {
        return (
          <React.Suspense fallback={() => (<div>Suspense</div>)}>
              <MarineApp {...props} />
          </React.Suspense>
        )
    }
}

export default App;
