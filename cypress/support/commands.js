// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })

Cypress.Commands.add(`isWithinViewport`, { prevSubject: true }, (subject, width, height) => {
  const bounding = subject[0].getBoundingClientRect()

  expect(bounding.top).to.be.at.least(0)
  expect(bounding.left).to.be.at.least(0)
  expect(bounding.right).to.be.lessThan(width + 1)
  expect(bounding.bottom).to.be.lessThan(height + 1)

  return subject
})

const addContext = require("mochawesome/addContext")

Cypress.Commands.add("addContext", content => {
  cy.once("test:after:run", test => {
    addContext({ test }, content)
  })
})
