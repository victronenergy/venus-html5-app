describe("Testing basic values rendering in the ui", () => {
  before(() => {
    cy.viewport(1280, 720)
  })

  it("Successfully opens page", () => {
    cy.visit("/")
    cy.get(".cy-logo").should("be.visible")
    cy.get(".cy-metrics").should("be.visible")
  })

  // TODO fix tests in new Marine App (tailwind classes, added required classes).

  /*  it("Has values in all value elements", () => {
      // Wait for data to start coming in
      cy.wait(1000)
      cy.get("span.value").each((span) => {
        assert.isNotNaN(parseInt(span.text()))
      })
    })*/
})

export {}
