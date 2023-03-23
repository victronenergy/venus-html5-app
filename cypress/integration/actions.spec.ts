describe("Testing basic actions in the ui", () => {
  it("Successfully opens page", () => {
    cy.visit("/")
    cy.get("header > .logo").should("be.visible")
    cy.get(".metrics-container").should("be.visible")
  })

  it("Selects inverter charger mode", () => {
    cy.get(".charger__mode-selector > .selector-button.selector-button--active").as("active").should("have.length", 1)
    cy.get(".charger__mode-selector > .selector-button:not(.selector-button--active)")
      .as("buttons")
      .should("have.length", 2)
    cy.get("@buttons").eq(0).click()
    cy.get("@buttons").eq(0).should("have.class", "selector-button--active")
    cy.get("@active").should("not.have.class", "selector-button--active")
  })

  it("Selects shore input limit", () => {
    cy.get(".metric__current-input-limit > .selector-button").click()
    cy.get(".amperage-selector__container").should("be.visible")
    cy.get(".amperage-selector > div > .selector-button.selector-button--active").as("active").should("have.length", 1)
    cy.get(".amperage-selector > div > .selector-button:not(.selector-button--active)").as("buttons")
    cy.get("@buttons").eq(0).click()
    cy.get(".amperage-selector__container").should("not.be.visible")
  })

  it("Opens remote console", () => {
    cy.get(".remote-console-button").click()
    cy.get(".remote-console__container").should("be.visible")
    cy.get("main").click()
    cy.get(".metrics-container").should("be.visible")
  })
})

export {}
