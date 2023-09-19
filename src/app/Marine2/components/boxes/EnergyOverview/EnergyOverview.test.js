import { mount } from "enzyme"
import React from "react"
import EnergyOverview from "./EnergyOverview"
import { AppViews } from "../../../modules/AppViews"

describe("EnergyOverview element", () => {
  describe("compact mode", () => {
    const wrapper = mount(<EnergyOverview componentMode="compact" />)

    it("should show content", () => {
      expect(wrapper.find(EnergyOverview).exists()).toBe(true)
    })

    it("should show expand link", () => {
      const boxes = wrapper.find(EnergyOverview).children().find("Box")

      let contentBox
      boxes.forEach((box) => {
        if (box.prop("title")?.toLowerCase() === "energy") {
          contentBox = box
        }
      })

      expect(contentBox).toBeDefined()
      expect(contentBox.prop("linkedView")).toBe(AppViews.BOX_ENERGY_OVERVIEW)
    })
  })

  describe("full mode", () => {
    const wrapper = mount(<EnergyOverview />)

    it("should use full mode by default", () => {
      expect(wrapper.find("GridPaginator").exists()).toBe(true)
    })

    it("should show content", () => {
      expect(wrapper.find(EnergyOverview).exists()).toBe(true)
    })
  })

  describe("todo", () => {
    it.todo("should show summary")
    it.todo("should show details")
    it.todo("should correctly pass props to GridPaginator")
    it.todo("should handle separate pageSelectorPropsSetter")
  })
})
