const deviceResolutions = {
  garmin: [[1000, 600], [1280, 720]]
}

describe("Loading the app", () => {
  for (let [device, resolutions] of Object.entries(deviceResolutions)) {
    for (let [width, height] of resolutions) {
      it(`successfully loads on ${device} resolution ${width}x${height}`, () => {
        cy.viewport(width, height)
        cy.visit("/")
        cy.get("#metrics-container").should("be.visible")
      })
    }
  }
})
