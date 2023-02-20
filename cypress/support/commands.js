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

import "@testing-library/cypress/add-commands"

// eslint-disable-next-line no-undef
Cypress.Commands.add(`isWithinViewport`, { prevSubject: true }, (subject, width, height) => {
  const bounding = subject[0].getBoundingClientRect()

  // in headless browser some tests are very fragile because of rounding errors
  // so we use a threshold to make them more stable
  const threshold = 3

  expect(bounding.top).to.be.at.least(0)
  expect(bounding.left).to.be.at.least(0)
  expect(bounding.right).to.be.lessThan(width + threshold)
  expect(bounding.bottom).to.be.lessThan(height + threshold)

  return subject
})

const addContext = require("mochawesome/addContext")

// eslint-disable-next-line no-undef
Cypress.Commands.add("addContext", (content) => {
  // eslint-disable-next-line no-undef
  cy.once("test:after:run", (test) => {
    addContext({ test }, content)
  })
})

export {}
