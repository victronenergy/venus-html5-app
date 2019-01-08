### MQTT TOPICS

The data originates from D-Bus on Venus OS. Detailed spec is
[here](https://github.com/victronenergy/venus/wiki/dbus). There
is a bridge between D-Bus and MQTT, code & documentation
[here](https://github.com/victronenergy/dbus-mqtt).

En example of available data is:

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

And that most of below paths are copied from that same dbus wiki page; and all lenghty explanations
have been stripped out. So, make sure to see the dbus wiki page for details.

#### Battery data:

`/Batteries`

#### Solar data:

```
system/0/Dc/Pv/*
```

#### AC Input data (Shore / Genset):

Some of our inverter/chargers have one AC input, others, the Quattros, have two. Sometimes only
one input is used; fe. when they have the two-input model for another reason than using the two
inputs. The installer configures the AC-input types in the menus: Settings -> System Setup.

Then they are stored in 'localsettings', available on MQTT as:

```
N/{portalId}/settings/0/Settings/SystemSetup/AcInput1
N/{portalId}/settings/0/Settings/SystemSetup/AcInput2
// 0: not in use; 1: grid, 2: generator, 3: shore
```

MQTT does not send notifications to these channels automatically, you need to explicitly send
a read request first to receive data.

For UIs that show only power, and also do not show generator & shore at the same time,
its simple: take these paths from system/0:

```
/Ac/Grid/*                      <- All from the shore. TODO: check if this shouldn't be /Ac/Shore
/Ac/Genset/*                    <- All from the generator.
```

For UIs that show more information, so also voltage and current, its a bit more complex:

- figure out which of the AC-inputs is what; so for example ACinput0 == Generator and
  ACinput1 == Shore.
- find the ve.bus service (see below).

Then, use these paths:

```
/Ac/ActiveIn/ActiveInput       <- Active input: 0 = ACin-1, 1 = ACin-2, 240 is none (inverting).

So, if the ActiveInput == Acinput1, then populate the Shore box with the values from these paths:
/Ac/ActiveIn/L1/F  <- Frequency (Hz)
/Ac/ActiveIn/L1/I  <- Current (Amps)
/Ac/ActiveIn/L1/P  <- Power (Watts)
/Ac/ActiveIn/L1/S  <- Power (VA - ignore this one)
/Ac/ActiveIn/L1/V  <- Voltage (Volts)
```

#### Inverter/charger data:

```
All prefixed with system/0/

/Dc/Vebus/Current               <- charge/discharge current between battery
                                   and inverter/charger
/Dc/Vebus/Power                 <- same, but then the power
/SystemState/State              <- Absorption, float, etc.

/Ac/ActiveIn/Source             <- The active AC-In source of the multi.
                                   0:not available, 1:grid, 2:generator,
                                   3:shore, 240: inverting/island mode.
/Ac/Consumption/NumberOfPhases  <- Either 1 (single phase), 2 (split-phase) or
                                   3 (three-phase)
/Ac/ConsumptionOnOutput/*       <- Use this for AC Consumption.

/VebusService                   <- Returns the service name of the vebus service.
                                   Use that to find the control options:
```

#### Inverter/charger control:

This starts with finding the service name and instance.

NOTE: all this just an educated guess on how to do that. You'll have to try over mqtt yourself if this works.
(and if it does, remove this line in this file)

Basically, what you want to find out is the instance number of the vebus service. These are
the available topics on system/0 that might help to do that:

```
ServiceMapping/com_victronenergy_charger_0                com.victronenergy.charger.socketcan_can0_di0_uc15639
ServiceMapping/com_victronenergy_settings_0                                         com.victronenergy.settings
ServiceMapping/com_victronenergy_solarcharger_0      com.victronenergy.solarcharger.socketcan_can0_di0_uc15965
ServiceMapping/com_victronenergy_solarcharger_258                         com.victronenergy.solarcharger.ttyO2
ServiceMapping/com_victronenergy_vebus_257                                       com.victronenergy.vebus.ttyO1
ServiceMapping/com_victronenergy_vecan_0                                          com.victronenergy.vecan.can0
VebusService                                                                     com.victronenergy.vebus.ttyO1
```

The instance you are looking for is the instance of the main VebusService, in above example that is
`com.victronenergy.vebus.ttyO1`. So:

1. request `system/0/VebusService`
2. look that up in the values of `system/0/ServiceMapping/*`
3. take the digit behind the last underscore, and now you'll know the instance

With above example, the instance is 257, making the prefix `vebus/257`.

Then the topics you are looking for to control input current limit are:

```
vebus/257/Ac/In/n/CurrentLimit                   <- R/W for input current limit.
vebus/257/Ac/In/n/CurrentLimit GetMin            <- not implemented!)
vebus/257/Ac/In/n/CurrentLimit GetMax
vebus/257/Ac/In/n/CurrentLimitIsAdjustable

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

On/Off/Charger-only control paths:

```
vebus/257/Mode                          <- Position of the switch.
                                           1=Charger Only;2=Inverter Only;3=On;4=Off
                                           Make sure to read CCGX manual, and limitations
                                           of this switch, for example when using a VE.Bus BMS.
vebus/257/ModeIsAdjustable              <- 0: only show the mode / 1: keep it adjustable
```

#### Tank data:

```
Note that there can be 0 or more tanks: each tank has its own instance number. Not
necessarily sequential or starting at 0.
```
