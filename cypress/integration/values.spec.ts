describe("Testing basic values rendering in the ui", () => {
  before(() => {
    cy.viewport(1280, 720)
  })

  it("Successfully opens page", () => {
    cy.visit("/")
    cy.get("header > .logo").should("be.visible")
    cy.get(".metrics-container").should("be.visible")
  })

  it("Has values in all value elements", () => {
    // Wait for data to start coming in
    cy.wait(1000)
    cy.get("span.value").each((span) => {
      assert.isNotNaN(parseInt(span.text()))
    })
  })
})

export {}
