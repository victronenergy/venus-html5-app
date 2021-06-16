// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands"

const addContext = require("mochawesome/addContext")

const MAX_TEST_NAME_LENGTH = 220

Cypress.on("test:after:run", (test, runnable) => {
  const fullTestName = getFullTestName(runnable)
  if (test.state === "failed") {
    const imagePath = `screenshots/${Cypress.spec.name}/${fullTestName} (failed).png`
    addContext({ test }, imagePath)
  }
  addContext({ test }, `videos/${Cypress.spec.name}.mp4`)
})

function getFullTestName(runnable: Mocha.Test) {
  let item = runnable
  const name = [runnable.title]

  while (item.parent) {
    name.unshift(item.parent.title)
    // @ts-ignore
    item = item.parent
  }

  return name
    .filter(Boolean)
    .map((n) => n.trim())
    .join(" -- ")
    .substring(0, MAX_TEST_NAME_LENGTH)
}
