import { mount } from "enzyme"
import React from "react"
import Grid from "./Grid"
import Box from "../Box"

describe("Grid element", () => {
  describe("row flow with content", () => {
    const wrapper = mount(
      <Grid>
        <Box title={"Box1"}>Box1</Box>
        <Box title={"Box2"}>Box2</Box>
        <Box title={"Box3"}>Box3</Box>
      </Grid>
    )

    it("should show content", () => {
      expect(wrapper.find("Box").length).toBe(3)
    })

    it("should use row flow by default", () => {
      expect(wrapper.find("Box").first().parents(".flex.flex-wrap").prop("className")).toContain("flex-row")
    })
  })

  describe("col flow with content", () => {
    const wrapper = mount(
      <Grid flow={"col"}>
        <Box title={"Box1"}>Box1</Box>
        <Box title={"Box2"}>Box2</Box>
        <Box title={"Box3"}>Box3</Box>
      </Grid>
    )

    it("should show content", () => {
      expect(wrapper.find("Box").length).toBe(3)
    })

    it.only("should use col flow", () => {
      expect(wrapper.find("Box").first().parents(".flex.flex-wrap").prop("className")).toContain("flex-col")
    })
  })
})
