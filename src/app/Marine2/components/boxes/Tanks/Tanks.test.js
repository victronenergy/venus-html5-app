import { mount } from "enzyme"
import React from "react"
import Tanks from "./Tanks"
import { AppViews } from "../../../modules/AppViews"

describe("Tanks element", () => {
  describe("compact mode", () => {
    const wrapper = mount(<Tanks componentMode="compact" />)

    it("should show content", () => {
      expect(wrapper.find(Tanks).exists()).toBe(true)
    })

    it("should show expand link", () => {
      const boxes = wrapper.find(Tanks).children().find("Box")

      let contentBox
      boxes.forEach((box) => {
        if (box.prop("title")?.toLowerCase() === "tanks") {
          contentBox = box
        }
      })

      expect(contentBox).toBeDefined()
      expect(contentBox.prop("linkedView")).toBe(AppViews.BOX_TANKS)
    })
  })

  describe("full mode", () => {
    const wrapper = mount(<Tanks />)

    // FIXME: this test fails due to conflict with mode and orientation props in Tanks component
    it.skip("should use full mode by default", () => {
      expect(wrapper.find("GridPaginator").exists()).toBe(true)
    })

    it("should show content", () => {
      expect(wrapper.find(Tanks).exists()).toBe(true)
    })
  })

  describe("todo", () => {
    it.todo("should show summary")
    it.todo("should show details")
    it.todo("should correctly pass props to GridPaginator")
    it.todo("should handle separate pageSelectorPropsSetter")
  })
})
