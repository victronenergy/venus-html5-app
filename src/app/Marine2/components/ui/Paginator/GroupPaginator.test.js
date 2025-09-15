import { mount } from "enzyme"
import React from "react"
import GroupPaginator from "./GroupPaginator"
import Box from "../Box"

describe("GroupPaginator element", () => {
  describe("without page selector", () => {
    const wrapper = mount(
      <GroupPaginator>
        <>
          <Box title={"Group1 Box1"}>Box1-1</Box>
          <Box title={"Group1 Box2"}>Box1-2</Box>
          <Box title={"Group1 Box3"}>Box1-3</Box>
          <Box title={"Group1 Box4"}>Box1-4</Box>
        </>
        <>
          <Box title={"Group2 Box1"}>Box2-1</Box>
          <Box title={"Group2 Box2"}>Box2-2</Box>
          <Box title={"Group2 Box3"}>Box2-3</Box>
          <Box title={"Group2 Box4"}>Box2-4</Box>
        </>
        <>
          <Box title={"Group3 Box1"}>Box3-1</Box>
          <Box title={"Group3 Box2"}>Box3-2</Box>
          <Box title={"Group3 Box3"}>Box3-3</Box>
          <Box title={"Group3 Box4"}>Box3-4</Box>
        </>
      </GroupPaginator>
    )

    it("should show content", () => {
      expect(wrapper.find("Box").length).toBe(12)
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
