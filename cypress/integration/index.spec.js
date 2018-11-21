const deviceResolutions = {
  garmin: [[1000, 600], [1280, 720], [400, 400]]
}

const isElementInViewport = (el, window) => {
  const rect = el.getBoundingClientRect()
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth
}

for (let [device, resolutions] of Object.entries(deviceResolutions)) {
  for (let [width, height] of resolutions) {
    context(`${device} resolution ${width}x${height}`, () => {
      beforeEach(() => {
        cy.viewport(width, height)
      })

      it("Successfully opens page", () => {
        cy.visit("/")
        cy.get(".connection > p").should("contain", "Connected")
        cy.get("#metrics-container").should("be.visible")
      })

      describe("Contains metrics elements", () => {
        it("Contains metrics", () => {
          cy.get(".metric").should("have.length", 6)
        })

        if (width < 450 && width / height >= 0.9) {
          it("Hides inverter charger, shore input limit and shore power in tiny ui", () => {
            cy.get(".inverter-charger").should("not.be.visible")
            cy.get(".metric--shore-input-limit").should("not.be.visible")
            cy.get(".shore-power__container").should("not.be.visible")
          })
        }
      })

      describe("Elements are in viewport", () => {
        it("main", () => {
          cy.window().then(window => {
            cy.get("main")
              .then(el => isElementInViewport(el[0], window))
              .should("be.true")
          })
        })
      })
    })
  }
}
