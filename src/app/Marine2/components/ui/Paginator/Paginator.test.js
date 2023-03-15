import { mount } from "enzyme"
import React from "react"
import Paginator from "./Paginator"
import Box from "../Box"

describe("Paginator element", () => {
  describe("without page selector", () => {
    const wrapper = mount(
      <Paginator>
        <Box title={"Box1"}>Box1</Box>
        <Box title={"Box2"}>Box2</Box>
        <Box title={"Box3"}>Box3</Box>
        <Box title={"Box4"}>Box4</Box>
      </Paginator>
    )

    it("should show content", () => {
      expect(wrapper.find("Box").length).toBe(4)
    })

    it("should not show page selector", () => {
      expect(wrapper.find("PageFlipper").exists()).toBe(false)
    })

    it.todo("should handle vertical orientation")
  })

  describe("with page selector", () => {
    it.todo("should show partial content")
    it.todo("should show page selector")
    it.todo("should handle vertical orientation")
  })
})
