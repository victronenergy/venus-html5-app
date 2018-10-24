import * as mqtt from "mqtt"
import VenusClient from "../src/service/VenusClient"

class MockClient {
  callbacks = {}

  notifyClientConnected() {
    this.callbacks["connect"].forEach(cb => cb(null, [{ topic: "x", ops: 0 }]))
  }

  on = () => {}
  once = (event, callback) => {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [callback]
    } else {
      this.callbacks[event].push(callback)
    }
  }

  subscribe = jest.fn()
}

const mockClient = new MockClient()
jest.mock("mqtt", () => {
  return {
    connect: () => mockClient
  }
})

test("should subscribe to details about the system on connect", () => {
  const client = new VenusClient(`mqtt://1.2.3.4`)
  client.connect()

  mockClient.notifyClientConnected()
  expect(mockClient.subscribe.mock.calls[0][0]).toEqual({
    "N/+/system/0/Serial": 0,
    "N/+/+/+/DeviceInstance": 0
  })
})
