import { parseMessage, parseTopic } from "../src/service/util"

describe("parseTopic", () => {
  test("splits topic into its parts", () => {
    expect(parseTopic("N/985dadd0c9e4/system/0/Serial")).toEqual({
      type: "N",
      portalId: "985dadd0c9e4",
      serviceType: "system",
      deviceInstance: 0,
      dbusPath: "/Serial"
    })
  })

  test("when reading shore power limit, it splits the input id out", () => {
    expect(parseTopic("N/985dadd0c9e4/system/0/Ac/In/1/CurrentLimit")).toEqual({
      type: "N",
      portalId: "985dadd0c9e4",
      serviceType: "system",
      deviceInstance: 0,
      dbusPath: "/CurrentLimit"
    })
  })
})

describe("parseMessage", () => {
  test("correctly extracts value from Buffer message", () => {
    const result = parseMessage("N/123/Serial", Buffer.from('{ "value": 123 }'))
    expect(result.value).toEqual(123)
  })

  test("correctly extracts value 0", () => {
    const result = parseMessage("N/123/Serial", Buffer.from('{ "value": 0 }'))
    expect(result.value).toEqual(0)
  })
})
