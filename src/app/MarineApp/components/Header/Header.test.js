import { mount } from "enzyme"
import React from "react"
import { Header } from "./Header"
import { VIEWS } from "../../../utils/constants"

describe("Header element", () => {
  describe("without pagination", () => {
    const wrapper = mount(
      <Header
        showRemoteConsoleSetting={true}
        handleRemoteConsoleButtonClicked={() => {}}
        currentView={VIEWS.METRICS}
        setPage={() => {}}
        currentPage={1}
        pages={1}
      />
    )

    it("should show the Victron logo", () => {
      // eslint-disable-next-line jest/valid-expect
      expect(wrapper.find("img").exists())
    })

    it("should not show pagination", () => {
      expect(wrapper.find(".header__paginator").exists()).toBe(false)
    })
  })

  describe("with more than 1 page of metrics", () => {
    const wrapper = mount(
      <Header
        showRemoteConsoleSetting={true}
        handleRemoteConsoleButtonClicked={() => {}}
        currentView={VIEWS.METRICS}
        setPage={() => {}}
        currentPage={1}
        pages={3}
      />
    )

    it("should show pagination", () => {
      expect(wrapper.find(".header__paginator").exists()).toBe(true)
    })

    it("should show 3 pages", () => {
      expect(wrapper.find(".header__paginator-page > svg").length).toBe(3)
    })
  })
})
