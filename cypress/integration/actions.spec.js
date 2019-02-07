describe("Testing basic actions in the ui", () => {
  before(() => {
    cy.viewport(1280, 720)
  })

  it("Successfully opens page", () => {
    cy.visit("/")
    cy.get(".connection > p").should("contain", "Connected")
    cy.get("#metrics-container").should("be.visible")
  })

  it("Selects inverter charger mode", () => {
    cy.get(".charger__mode-selector > button.selector-button--active")
      .as("active")
      .should("have.length", 1)
    cy.get(".charger__mode-selector > button:not(.selector-button--active)")
      .as("buttons")
      .should("have.length", 2)
    cy.get("@buttons")
      .eq(0)
      .click()
    cy.get("@buttons")
      .eq(0)
      .should("have.class", "selector-button--active")
    cy.get("@active").should("not.have.class", "selector-button--active")
  })

  it("Selects shore input limit", () => {
    cy.get(".metric__active-source button").click()
    cy.get(".amperage-selector__container").should("be.visible")
    cy.get("#metrics-container").should("not.be.visible")
    cy.get(".amperage-selector > button.selector-button--active")
      .as("active")
      .should("have.length", 1)
    cy.get(".amperage-selector > button:not(.selector-button--active)").as("buttons")
    cy.get("@buttons")
      .eq(0)
      .click()
    cy.get("@active").should("not.have.class", "selector-button--active")
    cy.get(".amperage-selector__container").should("not.be.visible")
  })

  it("Opens remote console", () => {
    cy.get(".remote-console-button").click()
    cy.get("#metrics-container").should("not.be.visible")
    cy.get(".remote-console__container").should("be.visible")
    cy.get("main").click()
    cy.get("#metrics-container").should("be.visible")
    cy.get(".remote-console__container").should("not.be.visible")
  })
})
