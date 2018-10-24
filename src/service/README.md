# Victron Venus Javascript SDK

Library for interacting to a Venus GX device through the MQTT broker available there.
More info about the broker, dbus and topics is available here: https://github.com/victronenergy/venus-html5-app/blob/master/TOPICS.md.

To use the library:

```js
import VenusClient, { DBUS_PATHS } from "./index"

const VENUS_IP = "10.46.105.219"
const client = new VenusClient(`mqtt://${VENUS_IP}`)
client.connect().then(
  () => {
    client.subscribe([
      DBUS_PATHS.BATTERY.VOLTAGE,
      DBUS_PATHS.BATTERY.POWER,
      DBUS_PATHS.BATTERY.CURRENT,
      DBUS_PATHS.BATTERY.SOC,

      DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.CURRENT,
      DBUS_PATHS.INVERTER_CHARGER.DC_LOADS.POWER,

      DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.CURRENT,
      DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.POWER,
      DBUS_PATHS.INVERTER_CHARGER.AC_LOADS.VOLTAGE,

      DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.IS_CONNECTED,
      DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.VOLTAGE,
      DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT,
      DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.POWER,
      DBUS_PATHS.INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT,

      DBUS_PATHS.INVERTER_CHARGER.SYSTEM.STATE,
      DBUS_PATHS.INVERTER_CHARGER.SYSTEM.MODE
    ])
  },
  err => {
    console.log("Failed to connect", err)
  }
)
```

### TODO

- Emit messages :)
- Support write operations
- Notify when connected / disconnected
