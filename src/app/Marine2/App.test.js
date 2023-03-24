import { mount, shallow } from "enzyme"
import React from "react"
import App from "./App"

describe("App element", () => {
  describe("error boundary", () => {
    const wrapper = shallow(<App />)

    it("should use error boundary", () => {
      const errorBoundary = wrapper.find("ErrorBoundary")
      expect(errorBoundary.exists()).toBe(true)
      expect(errorBoundary.find("Memo(App)").exists()).toBe(true)
    })
  })

  describe("todo", () => {
    it.todo("should show content")
  })
})
