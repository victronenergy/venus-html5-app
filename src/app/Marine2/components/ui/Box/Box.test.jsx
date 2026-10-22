import React from "react"
import { render, screen } from "@testing-library/react"
import Box from "./Box"
import { AppViews } from "../../../modules/AppViews"

describe("Box element", () => {
  const title = "Test title"
  const content = "Test content"
  const linkedView = AppViews.BOX_ENERGY_OVERVIEW

  describe("with content and title", () => {
    it("should show title", () => {
      render(
        <Box title={title}>
          <div>{content}</div>
        </Box>,
      )
      expect(screen.getByText(title)).toBeInTheDocument()
    })

    it("should show content", () => {
      render(
        <Box title={title}>
          <div>{content}</div>
        </Box>,
      )
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })

  describe("with linked view", () => {
    it("should show link to the linked view", () => {
      render(
        <Box title={title} linkedView={linkedView}>
          <div>{content}</div>
        </Box>,
      )
      expect(screen.getByTestId("expand-icon")).toBeInTheDocument()
    })
  })

  describe("without pagination", () => {
    it("should not contain paginator", () => {
      const { container } = render(
        <Box title={title}>
          <div>{content}</div>
        </Box>,
      )
      expect(container.querySelector("[data-testid='page-selector']")).toBeNull()
    })
  })

  describe("with pagination", () => {
    it("should contain content", () => {
      render(
        <Box title={title} withPagination={true} paginationOrientation={"vertical"}>
          <div>{content}</div>
        </Box>,
      )
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })
})
