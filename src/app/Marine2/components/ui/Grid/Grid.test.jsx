import React from "react"
import { render } from "@testing-library/react"
import Grid from "./Grid"

describe("Grid element", () => {
  describe("row flow with content", () => {
    it("should show content", () => {
      const { container } = render(
        <Grid>
          <div>Box1</div>
          <div>Box2</div>
          <div>Box3</div>
        </Grid>,
      )
      expect(container.textContent).toContain("Box1")
      expect(container.textContent).toContain("Box2")
      expect(container.textContent).toContain("Box3")
    })

    it("should use row flow by default", () => {
      const { container } = render(
        <Grid>
          <div>Box1</div>
          <div>Box2</div>
          <div>Box3</div>
        </Grid>,
      )
      expect(container.querySelector(".flex-row")).toBeInTheDocument()
    })
  })

  describe("col flow with content", () => {
    it("should show content", () => {
      const { container } = render(
        <Grid flow={"col"}>
          <div>Box1</div>
          <div>Box2</div>
          <div>Box3</div>
        </Grid>,
      )
      expect(container.textContent).toContain("Box1")
      expect(container.textContent).toContain("Box3")
    })

    it("should use col flow", () => {
      const { container } = render(
        <Grid flow={"col"}>
          <div>Box1</div>
          <div>Box2</div>
          <div>Box3</div>
        </Grid>,
      )
      expect(container.querySelector(".flex-col")).toBeInTheDocument()
    })
  })

  describe("first child full height size", () => {
    it("should use 100% width for first child in row flow", () => {
      const { container } = render(
        <Grid>
          <div>Box1</div>
          <div>Box2</div>
          <div>Box3</div>
        </Grid>,
      )
      const firstWrapper = container.querySelector(".flex-wrap > div")
      expect(firstWrapper.style.width).toBe("100%")
      expect(firstWrapper.style.height).toBe("50%")
    })

    it("should use 100% height for first child in col flow", () => {
      const { container } = render(
        <Grid flow={"col"}>
          <div>Box1</div>
          <div>Box2</div>
          <div>Box3</div>
        </Grid>,
      )
      const firstWrapper = container.querySelector(".flex-wrap > div")
      expect(firstWrapper.style.height).toBe("100%")
      expect(firstWrapper.style.width).toBe("50%")
    })
  })

  describe("last child full height size", () => {
    it("should use 100% width for last child in row flow", () => {
      const { container } = render(
        <Grid forceFirstOrLastChild={"last"}>
          <div>Box1</div>
          <div>Box2</div>
          <div>Box3</div>
        </Grid>,
      )
      const wrappers = container.querySelectorAll(".flex-wrap > div")
      const lastWrapper = wrappers[wrappers.length - 1]
      expect(lastWrapper.style.width).toBe("100%")
      expect(lastWrapper.style.height).toBe("50%")
    })

    it("should use 100% height for last child in col flow", () => {
      const { container } = render(
        <Grid flow={"col"} forceFirstOrLastChild={"last"}>
          <div>Box1</div>
          <div>Box2</div>
          <div>Box3</div>
        </Grid>,
      )
      const wrappers = container.querySelectorAll(".flex-wrap > div")
      const lastWrapper = wrappers[wrappers.length - 1]
      expect(lastWrapper.style.height).toBe("100%")
      expect(lastWrapper.style.width).toBe("50%")
    })
  })
})
