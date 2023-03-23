import { mount } from "enzyme"
import React from "react"
import Box from "../Box"
import GridPaginator from "./GridPaginator"

describe("GridPaginator element", () => {
  describe("renders content", () => {
    const wrapper = mount(
      <GridPaginator perPage={4}>
        <Box title={"Box1"}>Box1</Box>
        <Box title={"Box2"}>Box2</Box>
        <Box title={"Box3"}>Box3</Box>
        <Box title={"Box4"}>Box4</Box>
      </GridPaginator>
    )

    it("should show content", () => {
      expect(wrapper.find("Box").length).toBe(4)
    })
  })

  describe("without paginator", () => {
    it("should not show paginator if children count is less than defined", () => {
      const wrapper = mount(
        <GridPaginator perPage={4}>
          <Box title={"Box1"}>Box1</Box>
          <Box title={"Box2"}>Box2</Box>
        </GridPaginator>
      )

      expect(wrapper.find("PageFlipper").exists()).toBe(false)
    })

    it("should not show paginator if children count is equal to defined", () => {
      const wrapper = mount(
        <GridPaginator perPage={4}>
          <Box title={"Box1"}>Box1</Box>
          <Box title={"Box2"}>Box2</Box>
          <Box title={"Box3"}>Box3</Box>
          <Box title={"Box4"}>Box4</Box>
        </GridPaginator>
      )

      expect(wrapper.find("PageFlipper").exists()).toBe(false)
    })
  })

  describe("with paginator", () => {
    const wrapper = mount(
      <GridPaginator perPage={2}>
        <Box title={"Box1"}>Box1</Box>
        <Box title={"Box2"}>Box2</Box>
        <Box title={"Box3"}>Box3</Box>
        <Box title={"Box4"}>Box4</Box>
      </GridPaginator>
    )

    it("should show paginator if children count is more than defined", () => {
      expect(wrapper.find("PageFlipper").exists()).toBe(true)
    })

    it("should use correct page count", () => {
      expect(wrapper.find("PageFlipper").prop("pages")).toBe(2)
    })

    it("should show correct current page", () => {
      expect(wrapper.find("PageSelector").prop("currentPage")).toBe(0)
      expect(wrapper.find("PageSelector").prop("maxPages")).toBe(2)
    })
  })

  describe("todo", () => {
    it.todo("should show partial content")
    it.todo("should switch between pages")
    it.todo("should support horizontal orientation")
    it.todo("should correctly pass props to Grid")
    it.todo("should handle separate pageSelectorPropsSetter")
  })
})
