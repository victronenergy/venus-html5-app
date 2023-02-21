import { parseTopic } from "./util"

describe("parseTopic", () => {
  test("splits topic into its parts", () => {
    expect(parseTopic("N/985dadd0c9e4/system/0/Serial")).toEqual({
      type: "N",
      portalId: "985dadd0c9e4",
      serviceType: "system",
      deviceInstance: 0,
      dbusPath: "/Serial",
    })
  })

  test("when reading shore power limit, it splits the input id out", () => {
    expect(parseTopic("N/985dadd0c9e4/system/0/Ac/In/1/CurrentLimit")).toEqual({
      type: "N",
      portalId: "985dadd0c9e4",
      serviceType: "system",
      deviceInstance: 0,
      dbusPath: "/CurrentLimit",
    })
  })
})
