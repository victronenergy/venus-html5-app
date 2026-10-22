import React from "react"
import { render } from "@testing-library/react"
import GridPaginator from "./GridPaginator"

describe("GridPaginator element", () => {
  describe("renders content", () => {
    it("should show content", () => {
      const { container } = render(
        <GridPaginator perPage={4}>
          <div>Box1</div>
          <div>Box2</div>
          <div>Box3</div>
          <div>Box4</div>
        </GridPaginator>,
      )
      expect(container.textContent).toContain("Box1")
      expect(container.textContent).toContain("Box4")
    })
  })

  describe("without paginator", () => {
    it("should not show paginator if children count is less than defined", () => {
      const { container } = render(
        <GridPaginator perPage={4}>
          <div>Box1</div>
          <div>Box2</div>
        </GridPaginator>,
      )
      expect(container.querySelector("[data-testid='page-selector']")).toBeNull()
    })

    it("should not show paginator if children count is equal to defined", () => {
      const { container } = render(
        <GridPaginator perPage={4}>
          <div>Box1</div>
          <div>Box2</div>
          <div>Box3</div>
          <div>Box4</div>
        </GridPaginator>,
      )
      expect(container.querySelector("[data-testid='page-selector']")).toBeNull()
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
