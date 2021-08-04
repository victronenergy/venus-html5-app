/// <reference types="cypress" />

const sizes = [
  [400, 768 / 4],
  [600, 768 / 4],
  [800, 768 / 4],
  [1000, 768 / 4],
  [1280, 720 / 4],
  [1086, 772 / 4],
  [1920, 1080 / 4],
  [1920, 1200 / 4],
]

describe("Testing pagination", () => {
  sizes.forEach((size) => {
    beforeEach(() => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
    })

    it("Successfully opens metrics view and render the paginator", () => {
      cy.visit("/")
      cy.get("header > .logo").should("be.visible")
      cy.get(".metrics-container").should("be.visible")
      cy.get(".header__paginator").should("be.visible")
    })

    it("Changes page", () => {
      const defaultColor = "#aaa"
      const activeColor = "#30afff"
      const firstCircleSelector = ".header__paginator > span > svg:nth-child(1) > circle"
      cy.get(firstCircleSelector).should("be.visible")
      cy.get(firstCircleSelector)
        .invoke("attr", "fill")
        .then((color) => color === activeColor)
      cy.get(".header__paginator > :last-child").click()
      const secondCircleSelector = ".header__paginator > span > svg:nth-child(2) > circle"
      cy.get(secondCircleSelector)
        .invoke("attr", "fill")
        .then((color) => color === defaultColor)
      cy.get(".metrics-container").should("be.visible")
    })
  })
})

export {}
