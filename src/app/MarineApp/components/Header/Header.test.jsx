import React from "react"
import { render } from "@testing-library/react"
import { Header } from "./Header"
import { VIEWS } from "../../../utils/constants"

describe("Header element", () => {
  describe("without pagination", () => {
    it("should show the Victron logo", () => {
      const { container } = render(
        <Header
          showRemoteConsoleSetting={true}
          handleRemoteConsoleButtonClicked={() => {}}
          currentView={VIEWS.METRICS}
          setPage={() => {}}
          currentPage={1}
          pages={1}
        />,
      )
      expect(container.querySelector("img")).toBeInTheDocument()
    })

    it("should not show pagination", () => {
      const { container } = render(
        <Header
          showRemoteConsoleSetting={true}
          handleRemoteConsoleButtonClicked={() => {}}
          currentView={VIEWS.METRICS}
          setPage={() => {}}
          currentPage={1}
          pages={1}
        />,
      )
      expect(container.querySelector(".header__paginator")).toBeNull()
    })
  })

  describe("with more than 1 page of metrics", () => {
    it("should show pagination", () => {
      const { container } = render(
        <Header
          showRemoteConsoleSetting={true}
          handleRemoteConsoleButtonClicked={() => {}}
          currentView={VIEWS.METRICS}
          setPage={() => {}}
          currentPage={1}
          pages={3}
        />,
      )
      expect(container.querySelector(".header__paginator")).toBeInTheDocument()
    })

    it("should show 3 pages", () => {
      const { container } = render(
        <Header
          showRemoteConsoleSetting={true}
          handleRemoteConsoleButtonClicked={() => {}}
          currentView={VIEWS.METRICS}
          setPage={() => {}}
          currentPage={1}
          pages={3}
        />,
      )
      expect(container.querySelectorAll(".header__paginator-page > svg").length).toBe(3)
    })
  })
})
