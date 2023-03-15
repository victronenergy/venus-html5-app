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

    it("should use col flow", () => {
      expect(wrapper.find("Box").first().parents(".flex.flex-wrap").prop("className")).toContain("flex-col")
    })
  })

  describe("first child full height size", () => {
    it("should use 100% width for first child in row flow", () => {
      const wrapper = mount(
        <Grid>
          <Box title={"Box1"}>Box1</Box>
          <Box title={"Box2"}>Box2</Box>
          <Box title={"Box3"}>Box3</Box>
        </Grid>
      )

      expect(wrapper.find("Box").first().parent().prop("style")).toHaveProperty("width", "100%")
      expect(wrapper.find("Box").first().parent().prop("style")).toHaveProperty("height", "50%")
    })

    it("should use 100% height for first child in col flow", () => {
      const wrapper = mount(
        <Grid flow={"col"}>
          <Box title={"Box1"}>Box1</Box>
          <Box title={"Box2"}>Box2</Box>
          <Box title={"Box3"}>Box3</Box>
        </Grid>
      )

      expect(wrapper.find("Box").first().parent().prop("style")).toHaveProperty("height", "100%")
      expect(wrapper.find("Box").first().parent().prop("style")).toHaveProperty("width", "50%")
    })
  })

  describe("last child full height size", () => {
    it("should use 100% width for last child in row flow", () => {
      const wrapper = mount(
        <Grid forceFirstOrLastChild={"last"}>
          <Box title={"Box1"}>Box1</Box>
          <Box title={"Box2"}>Box2</Box>
          <Box title={"Box3"}>Box3</Box>
        </Grid>
      )

      expect(wrapper.find("Box").last().parent().prop("style")).toHaveProperty("width", "100%")
      expect(wrapper.find("Box").last().parent().prop("style")).toHaveProperty("height", "50%")
    })

    it("should use 100% height for last child in col flow", () => {
      const wrapper = mount(
        <Grid flow={"col"} forceFirstOrLastChild={"last"}>
          <Box title={"Box1"}>Box1</Box>
          <Box title={"Box2"}>Box2</Box>
          <Box title={"Box3"}>Box3</Box>
        </Grid>
      )

      expect(wrapper.find("Box").last().parent().prop("style")).toHaveProperty("height", "100%")
      expect(wrapper.find("Box").last().parent().prop("style")).toHaveProperty("width", "50%")
    })
  })
})
