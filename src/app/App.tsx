import { KVNRV } from "./KVNRV"
import { MarineApp } from "./MarineApp"
import '../css/index.scss'

export type AppProps = {
    host: string
    port: number
}
const App = (props: AppProps) => {
    const whitelabel = "KVNRV";

    if (whitelabel === "KVNRV") {
        return (
            <KVNRV {...props} />
        )
    } else {
        return (
            <MarineApp {...props} />
        )
    }
}

export default App;
