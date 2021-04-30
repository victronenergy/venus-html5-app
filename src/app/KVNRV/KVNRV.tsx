import Header from "./components/Header"
import React from "react"
import { Metrics } from "./components/Views"
import { AppProps } from "../App"

type AppState = {
  darkMode: boolean
}

export class KVNRV extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.state = { darkMode: false }
  }

  toggleDarkMode() {
    this.setState({ darkMode: !this.state.darkMode })
  }

  render() {
    return (
      <div className={"container " + (this.state.darkMode ? "dark" : "light")}>
        <Header darkMode={this.state.darkMode} toggleDarkMode={() => this.toggleDarkMode()} />
        <Metrics />
      </div>
    )
  }
}
