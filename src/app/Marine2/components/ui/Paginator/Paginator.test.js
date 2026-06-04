import React from "react"
import { render } from "@testing-library/react"
import Paginator from "./Paginator"

describe("Paginator element", () => {
  describe("without page selector", () => {
    it("should show content", () => {
      const { container } = render(
        <Paginator>
          <div>Box1</div>
          <div>Box2</div>
          <div>Box3</div>
          <div>Box4</div>
        </Paginator>,
      )
      expect(container.textContent).toContain("Box1")
      expect(container.textContent).toContain("Box4")
    })

    it.todo("should handle vertical orientation")
  })

  describe("with page selector", () => {
    it.todo("should show partial content")
    it.todo("should show page selector")
    it.todo("should handle vertical orientation")
  })
})
