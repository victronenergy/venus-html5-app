import { parseTopic } from "../src/service/util"

test("Parse messages", () => {
  expect(parseTopic("N/985dadd0c9e4/system/0/Serial")).toEqual({
    type: "N",
    portalId: "985dadd0c9e4",
    serviceType: "system",
    deviceInstance: 0,
    dbusPath: "/Serial"
  })
})
