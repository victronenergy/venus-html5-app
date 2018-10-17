import * as mqtt from "mqtt"
import VenusClient from "../app/service/VenusClient"
import Mock = jest.Mock
jest.mock("mqtt", "connect")

interface CallbackMap {
  [event: string]: Function[]
}

class MockClient {
  public callbacks: CallbackMap = {}

  mockIsConnected() {
    this.callbacks["connect"].forEach(cb => cb(null, [{ topic: "x", ops: 0 }]))
  }

  public on = (event: string, callback: Function) => {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [callback]
    } else {
      this.callbacks[event].push(callback)
    }
  }

  public subscribe: Mock = jest.fn()
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

  mockClient.mockIsConnected()
  expect(mockClient.subscribe.mock.calls[0][0]).toEqual({
    "N/+/system/0/Serial": 0,
    "N/+/+/+/DeviceInstance": 0
  })
})
