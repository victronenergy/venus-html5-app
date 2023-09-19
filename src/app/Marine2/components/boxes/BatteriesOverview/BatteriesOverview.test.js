import { mount } from "enzyme"
import React from "react"
import BatteriesOverview from "./BatteriesOverview"
import { AppViews } from "../../../modules/AppViews"

describe("BatteriesOverview element", () => {
  describe("compact mode", () => {
    const wrapper = mount(<BatteriesOverview componentMode="compact" />)

    it("should show content", () => {
      expect(wrapper.find(BatteriesOverview).exists()).toBe(true)
    })

    it("should show expand link", () => {
      const boxes = wrapper.find(BatteriesOverview).children().find("Box")

      let contentBox
      boxes.forEach((box) => {
        if (box.prop("title")?.toLowerCase() === "batteries") {
          contentBox = box
        }
      })

      expect(contentBox).toBeDefined()
      expect(contentBox.prop("linkedView")).toBe(AppViews.BOX_BATTERIES_OVERVIEW)
    })
  })

  describe("full mode", () => {
    const wrapper = mount(<BatteriesOverview />)

    it("should use full mode by default", () => {
      expect(wrapper.find("GridPaginator").exists()).toBe(true)
    })

    it("should show content", () => {
      expect(wrapper.find(BatteriesOverview).exists()).toBe(true)
    })
  })

  describe("todo", () => {
    it.todo("should show summary")
    it.todo("should show details")
    it.todo("should correctly pass props to GridPaginator")
    it.todo("should handle separate pageSelectorPropsSetter")
  })
})
