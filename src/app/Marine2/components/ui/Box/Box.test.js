import { mount } from "enzyme"
import React from "react"
import Box from "./Box"
import { AppViews } from "../../../modules/AppViews"
import Paginator from "../Paginator"

describe("Box element", () => {
  const title = "Test title"
  const content = "Test content"
  const linkedView = AppViews.BOX_ENERGY_OVERVIEW

  describe("with content and title", () => {
    const wrapper = mount(
      <Box title={title}>
        <div>{content}</div>
      </Box>
    )

    it("should show title", () => {
      expect(wrapper.text()).toContain(title)
    })

    it("should show content", () => {
      expect(wrapper.text()).toContain(content)
    })
  })

  describe("with linked view", () => {
    const wrapper = mount(
      <Box title={title} linkedView={linkedView}>
        <div>{content}</div>
      </Box>
    )

    it("should show link to the linked view", () => {
      const link = wrapper.find({ alt: "Expand" })
      expect(link.exists()).toBe(true)
      expect(link.parent().props()).toHaveProperty("onClick")
    })
  })

  describe("without pagination", () => {
    const wrapper = mount(
      <Box title={title}>
        <div>{content}</div>
      </Box>
    )

    it("should not contain paginator", () => {
      expect(wrapper.find(Paginator).exists()).toBe(false)
    })
  })

  describe("with pagination", () => {
    const wrapper = mount(
      <Box title={title} withPagination={true} paginationOrientation={"vertical"}>
        <div>{content}</div>
      </Box>
    )

    it("should contain paginator", () => {
      expect(wrapper.find(Paginator).exists()).toBe(true)
    })

    it("should contain content inside paginator", () => {
      expect(wrapper.find(Paginator).text()).toContain(content)
    })

    it("should passthrough paginator orientation", () => {
      expect(wrapper.find(Paginator).props()).toHaveProperty("orientation", "vertical")
    })
  })
})
