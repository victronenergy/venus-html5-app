import { VolumeUnit } from "@victronenergy/mfd-modules"

export const volumeValueFor = (volume: number, unit: VolumeUnit) => {
  // perform conversion from the base unit that is assumed to be "m^3"
  switch (unit) {
    case VolumeUnit.CUBIC_METERS:
      return volume
    case VolumeUnit.LITRES:
      return volume * 1000
    case VolumeUnit.GALLONS_IMPERIAL:
      return volume * 219.969
    case VolumeUnit.GALLONS_US:
      return volume * 264.172
  }
}
