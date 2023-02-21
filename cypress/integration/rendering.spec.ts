const halfVerticalSplit = (w: number, h: number) => {
  return [w / 2, h]
}

const thirdVerticalSplit = (w: number, h: number) => {
  return [w / 3, h]
}

const halfHorizontalSplit = (w: number, h: number) => {
  return [w, h / 2]
}

const quarter = (w: number, h: number) => {
  return [w / 2, h / 2]
}

const sixth = (w: number, h: number) => {
  return [w / 3, h / 2]
}

const deviceResolutions = {
  simrad: [
    [1280, 720],
    [1086, 772],
    halfHorizontalSplit(1086, 772),
    halfVerticalSplit(1086, 772),
    thirdVerticalSplit(1086, 772),
    quarter(1086, 772),
    sixth(1086, 772),
  ],
  raymarine: [
    [800, 480],
    [1280, 720],
    [1280, 800],
    [1920, 1080],
    [1920, 1200],
  ],
  garmin: [
    [1280, 723],
    halfHorizontalSplit(1280, 723),
    halfVerticalSplit(1280, 723),
    thirdVerticalSplit(1280, 723),
    quarter(1280, 723),
    sixth(1280, 723),
  ],
  other: [
    [2560, 1440],
    [3840, 2160],
    [1024, 1366],
  ],
}

for (let [device, resolutions] of Object.entries(deviceResolutions)) {
  for (let [width, height] of resolutions) {
    context(`${device} resolution ${width}x${height}`, () => {
      beforeEach(() => {
        cy.viewport(width, height)
      })

      it("Successfully opens page", () => {
        cy.visit("/")
        cy.get("header > .logo").should("be.visible")
        cy.get(".metrics-container").should("be.visible")
      })

      describe("Contains metrics elements", () => {
        it("Contains metrics", () => {
          cy.get(".metric").should("have.length", 7)
        })

        if (width < 450 && width / height >= 0.9) {
          it("Hides inverter charger in tiny ui", () => {
            cy.get(".inverter-charger").should("not.be.visible")
          })
        }
      })

      describe("Elements are in viewport", () => {
        it("header", () => {
          // @ts-ignore
          cy.get("header").isWithinViewport(width, height)
        })

        it("metrics-container", () => {
          // @ts-ignore
          cy.get(".metrics-container").isWithinViewport(width, height)
        })

        it("takes a screenshot", () => {
          // Wait for the app to react to the viewport changes
          cy.wait(1000)
          cy.screenshot(`${device} resolution ${width}x${height}`)
          const imagePath = `screenshots/${Cypress.spec.name}/${device} resolution ${width}x${height}.png`
          // @ts-ignore
          cy.addContext(imagePath)
        })
      })
    })
  }
}

export {}
