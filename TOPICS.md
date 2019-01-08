### MQTT TOPICS

The data originates from D-Bus on Venus OS. Detailed spec is
[here](https://github.com/victronenergy/venus/wiki/dbus). There
is a bridge between D-Bus and MQTT, code & documentation
[here](https://github.com/victronenergy/dbus-mqtt).

An example of available data is:

```
Topic: N/e0ff50a097c0/system/0/Dc/Battery/Voltage`
Payload: {"value": 210}

Explanation:

e0ff50a097c0         -> VRM Portal ID
system               -> Service type
0                    -> Device Instance (used when there is more than one of this service type)
/Dc/Battery/Voltage  -> D-Bus path.
```

On D-Bus, data is sent on change. And dbus-mqtt translates each transmission on D-Bus, called
a PropertiesChanged message, to a mqtt publish().

### What topics have what data?

First, note that most data comes from the system device. See explanation on the dbus wiki page
for more info on that. Instance is always 0.

And that most of below paths are copied from that same dbus wiki page; and all lengthy explanations
have been stripped out. So, make sure to see the dbus wiki page for details.

#### Battery data:

Info about all batteries available in the system is available under:

```
N/{portalId}/system/0/Batteries
// -> {"value": [
            {
            "soc": 100.0,
            "active_battery_service": true, // True for main battery
            "temperature": 30.0,
            "power": 472.851013184,
            "current": 8.30000019073,
            "instance": 256,
            "state": 1,
            "voltage": 56.9799995422,
            "id": "com.victronenergy.battery.ttyO0",
            "name": "BMV-702"
            }
        ]}
```

#### Solar data:

```
N/{portalId}/system/0/Dc/Pv/Power
N/{portalId}/system/0/Dc/Pv/Current
```

#### AC Input data (Shore / Genset):

##### What inputs are available?

Some of our inverter/chargers have one AC input, others, the Quattros, have two. Sometimes only
one input is used; fe. when they have the two-input model for another reason than using the two
inputs. The installer configures the AC-input types in the menus: Settings -> System Setup.

Then they are stored in 'localsettings', available on MQTT as:

```
N/{portalId}/settings/0/Settings/SystemSetup/AcInput1
N/{portalId}/settings/0/Settings/SystemSetup/AcInput2
// 0: not in use; 1: grid, 2: generator, 3: shore
```

##### Which input is currently active?

Figure out which of the AC-inputs is what; so for example ACinput0 == Generator and
ACinput1 == Shore. (based on the the settings above) and then look at this path:

```
N/{portalId}/vebus/{vebusInstanceId}/Ac/ActiveIn/ActiveInput
// Active input: 0 = ACin-1, 1 = ACin-2, 240 is none (inverting).
```

##### How to get information about the currently active input (grid / shore / generator)?

For UIs that show more information, so also voltage and current, its a bit more complex:

- figure out which of the AC-inputs is what; so for example ACinput0 == Generator and
  ACinput1 == Shore.
- find the ve.bus service (see below).

Then, use these paths:

```
// So, if the ActiveInput == Acinput1, then populate the Shore box with the values from these paths:
N/{portalId}/vebus/{vebusInstanceId}/Ac/ActiveIn/L1/I  <- Current (Amps) (+ L2, L3 for 3 phase)
N/{portalId}/vebus/{vebusInstanceId}/Ac/ActiveIn/L1/P  <- Power (Watts)
N/{portalId}/vebus/{vebusInstanceId}/Ac/ActiveIn/L1/V  <- Voltage (Volts)
```

You can check if the system is a 3 phase system using:

```
N/${portalId}/vebus/${vebusInstanceId}/Ac/NumberOfPhases
```

Note: For UIs that show only power, and also do not show generator & shore at the same time,
you can take the info from these paths under system/0:

```
N/{portalId}/system/0/Ac/Grid/*                      <- All from the shore. TODO: check if this shouldn't be /Ac/Shore
N/{portalId}/system/0/Ac/Genset/*                    <- All from the generator.
```

#### Inverter/charger data:

```
N/{portalId}/system/0/Dc/Vebus/Current               <- charge/discharge current between battery
                                                    and inverter/charger

N/{portalId}/system/0/Dc/Vebus/Power                 <- same, but then the power

N/{portalId}/system/0/SystemState/State              <- Absorption, float, etc.
                                                       0 - "Off" 1 - "Low power"
                                                       2 - "VE.Bus Fault condition"
                                                       3 - "Bulk charging"
                                                       4 - "Absorption charging"
                                                       5 - "Float charging"
                                                       6 - "Storage mode"
                                                       7 - "Equalisation charging"
                                                       8 - "Passthru"
                                                       9 - "Inverting"
                                                       10 - "Assisting"
                                                       256 - "Discharging"
                                                       257 - "Sustain"

N/{portalId}/system/0/Ac/ActiveIn/Source             <- The active AC-In source of the multi.
                                                       0:not available, 1:grid, 2:generator,
                                                       3:shore, 240: inverting/island mode.

N/{portalId}/system/0/Ac/Consumption/NumberOfPhases  <- Either 1 (single phase), 2 (split-phase) or
                                                        3 (three-phase)

N/{portalId}/system/0/VebusService                   <- Returns the service name of the vebus service.
                                                        Use that to find the control options:
```

#### Inverter/charger control:

##### Shore input limit

This starts with finding the service name and instance.

The VE.Bus device instance is available under:
`N/{portalId}/vebus/+/DeviceInstance // { value: 257 }`

With above example, the instance is 257, making the prefix `vebus/257`.

Then the topics you are looking for to control input current limit are:

```
N/{portalId}/vebus/{vebusInstanceId}/Ac/In/{n}/CurrentLimit                   <- R/W for input current limit.
N/{portalId}/vebus/{vebusInstanceId}/Ac/In/{n}/CurrentLimit GetMin            <- not implemented!
N/{portalId}/vebus/{vebusInstanceId}/Ac/In/{n}/CurrentLimit GetMax            <- not implemented in mqtt
N/{portalId}/vebus/{vebusInstanceId}/Ac/In/{n}/CurrentLimitIsAdjustable

n = the AC-input. 0 = AC-input 1, and 1 = AC-input 2.

And, don't hardcode that vebus/257 ;-).
```

Notes:

1. when /vebus/257/In/n/CurrentLimit is set to an invalid value, it will automatically
   be changed to a valid value. Some examples for setting it to an invalid value are
   setting it too low, or setting it to a value that doesn't match with regards to step-sizes.
2. the Getmin is not implemented because its difficult to implement on our side: The
   panel frames used to communicate current limits only contain the max value. min is not
   included. We can only get the minimum from the active AC input. The minimum is a special
   case, it will change depending on the configuration of the inverter/charger, for example
   disabling "powerAssist" changes it.
3. Paths for /CurrentLimit described below are only available starting from version 415 of the VE.Bus device.

##### Suggestions available for selecting the shore input limit

The list of amperages displayed depends on whether the device is US based or EU based.

To determine that, get the product id from:

```
N/{portalId}/vebus/{vebusInstanceId}/ProductId
```

Then, mask the Product id with `0xFF00`

If the result is `0x1900` or `0x2600` it is an EU model (230VAC)

If the result is `0x2000` or `0x2700` it is an US model (120VAC)

Default values for US/EU are:

```
USAmperage = [10, 15, 20, 30, 50, 100]
EUAmperage = [6, 10, 13, 16, 25, 32, 63]
```

##### On/Off/Charger-only control paths

```
N/{portalId}/vebus/257/Mode                          <- Position of the switch.
                                                           1=Charger Only;2=Inverter Only;3=On;4=Off
N/{portalId}/vebus/257/ModeIsAdjustable              <- 0: only show the mode / 1: keep it adjustable
```

#### AC Loads

Get the available number of phases:

```
N/${portalId}/system/0/Ac/Consumption/NumberOfPhases
```

Current:

```
N/{portalId]/vebus/{vebusInstanceId}/Ac/Out/L1/I
N/{portalId]/vebus/{vebusInstanceId}/Ac/Out/L2/I
N/{portalId]/vebus/{vebusInstanceId}/Ac/Out/L3/I
```

Voltage:

```
N/{portalId]/vebus/{vebusInstanceId}/Ac/Out/L1/V
N/{portalId]/vebus/{vebusInstanceId}/Ac/Out/L2/V
N/{portalId]/vebus/{vebusInstanceId}/Ac/Out/L3/V
```

Power:

```
N/{portalId]/vebus/{vebusInstanceId}/Ac/Out/L1/P
N/{portalId]/vebus/{vebusInstanceId}/Ac/Out/L2/P
N/{portalId]/vebus/{vebusInstanceId}/Ac/Out/L3/P
```

#### DC Loads

To get the current, divide the DC system power by DC battery voltage

```
N/{portalId}/system/0/Dc/System/Power
N/{portalId}/system/0/Dc/Battery/Voltage
```

For the power, use:

```
N/{portalId}/system/0/Dc/System/Power
```
