import Header  from "./components/Header"
import React from "react"
import { Metrics } from "./components/Views"
import { AppProps } from "../utils/constants"

type AppState = {
  dark_mode: boolean
}

export class KVNRV extends React.Component<AppProps, AppState>{
  constructor(props: AppProps) {
    super(props);

    this.state = { dark_mode: false }
  }

  toggleDarkMode() {
    this.setState({ dark_mode: !this.state.dark_mode })
  }

  render() {
    return (
      <div className={'container ' + (this.state.dark_mode ? 'dark' : 'light')}>
        <Header toggleDarkMode={() => this.toggleDarkMode()} />
        <Metrics />
      </div>
    )
  }
}
