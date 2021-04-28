import { KVNRV } from "./KVNRV"
import { MarineApp } from "./MarineApp"
import './css/index.scss'

export type AppProps = {
    host: string
    port: number
}
const App = (props: AppProps) => {
    const whitelabel = "KVNRV";

    if (whitelabel === "KVNRV") {
        return (
          <div>
              <KVNRV {...props} />
          </div>
        )
    } else {
        return (
          <div>
              <MarineApp {...props} />
          </div>
        )
    }
}

export default App;
