import { KVNRV } from "./KVNRV/KVNRV"
import { MarineApp } from "./MarineApp/MarineApp"

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
