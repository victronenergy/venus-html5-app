import { Card, SIZE_WIDE, SIZE_LONG } from "../../../components/Card"
import { NotAvailable } from "../NotAvailable"
import NumericValue, { formatNumber } from "../../../components/NumericValue"
import { useSendUpdate, useTank } from "../../../modules"
import { TankProps } from "./index"

import "./BigTank.scss"
import { useEffect, useState } from "react"
import { VOLUME_UNITS, VolumeUnit, VolumeUnits } from "../../utils/constants"

import { fluidTypeFormatter } from "./SmallTank"

export const BigTank = ({ tankId, conf, invert }: TankProps) => {
  const [height, setHeight] = useState(0)
  const tank = useTank(tankId)
  const tankLevel = (tank.level ?? 0) / 100
  const footer = useSendUpdate(
    invert ? 1 - tankLevel : tankLevel,
    conf,
    tank.fluidType && fluidTypeFormatter(tank.fluidType)
  )
  useEffect(() => {
    setHeight(100 - (tank.level ?? 0))
  }, [tank.level, tankLevel])

  const unit: VolumeUnit =
    tank?.unit && Object.keys(VOLUME_UNITS).includes(tank.unit.toString())
      ? VOLUME_UNITS[tank.unit.toString() as keyof VolumeUnits]
      : VOLUME_UNITS.default

  return (
    <div className="">
      <Card title={fluidTypeFormatter(tank.fluidType)} size={[SIZE_WIDE, SIZE_LONG]} footer={footer}>
        {tank ? (
          <div className="big-tank">
            <div className="indicator-main">
              <span>
                <NumericValue value={tank.level} unit="%" defaultValue={"--"} precision={0} />
                <div className="name">
                  {formatNumber({ value: tank.remaining * unit.factor, unit: unit.unit, precision: unit.precision })}
                </div>
              </span>
            </div>

            <div className="tank-illustration">
              <svg viewBox="0 0 194 297" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="tank-clip-path">
                  <path d="M142.86761,9 L188.588542,31.9470947 C189.9407,32.6257357 191.043565,33.6567803 191.80839,34.8963912 C192.573215,36.136002 193,37.5841792 193,39.0970852 L193,39.0970852 L193,89.6481802 C193,90.4766074 192.664214,91.2266074 192.12132,91.7695006 C191.578427,92.3123938 190.828427,92.6481802 190.000052,92.6481802 L190.000052,92.6481802 L185.521997,92.6479482 L185.522613,289 C185.522613,290.932997 184.739111,292.682997 183.472361,293.949747 C182.20561,295.216498 180.45561,296 178.522613,296 L178.522613,296 L24.4120603,296 C22.4790637,296 20.7290637,295.216498 19.4623128,293.949747 C18.195562,292.682997 17.4120603,290.932997 17.4120603,289 L17.4120603,289 L17.4119997,92.6479591 L12,92.6481802 C11.1715729,92.6481802 10.4215729,92.3123938 9.87867966,91.7695006 C9.33578644,91.2266074 9,90.4766074 9,89.6481802 L9,89.6481802 L9,68 L4,68 C3.17157288,68 2.42157288,67.6642136 1.87867966,67.1213203 C1.33578644,66.5784271 1,65.8284271 1,65 L1,65 L1,57 C1,56.1715729 1.33578644,55.4215729 1.87867966,54.8786797 C2.42157288,54.3357864 3.17157288,54 4,54 L4,54 L9,54 L9,39.1418236 C9,37.6185618 9.43258641,36.1614083 10.2067447,34.9166985 C10.980903,33.6719886 12.0966331,32.6397224 13.4629206,31.9662352 L13.4629206,31.9662352 L60.0539724,9 L142.86761,9 Z"></path>
                </clipPath>
                <g fill="#FFFFFF" stroke="#979797" strokeWidth="2" fillOpacity="0.10">
                  <path d="M142.86761,9 L188.588542,31.9470947 C189.9407,32.6257357 191.043565,33.6567803 191.80839,34.8963912 C192.573215,36.136002 193,37.5841792 193,39.0970852 L193,39.0970852 L193,89.6481802 C193,90.4766074 192.664214,91.2266074 192.12132,91.7695006 C191.578427,92.3123938 190.828427,92.6481802 190.000052,92.6481802 L190.000052,92.6481802 L185.521997,92.6479482 L185.522613,289 C185.522613,290.932997 184.739111,292.682997 183.472361,293.949747 C182.20561,295.216498 180.45561,296 178.522613,296 L178.522613,296 L24.4120603,296 C22.4790637,296 20.7290637,295.216498 19.4623128,293.949747 C18.195562,292.682997 17.4120603,290.932997 17.4120603,289 L17.4120603,289 L17.4119997,92.6479591 L12,92.6481802 C11.1715729,92.6481802 10.4215729,92.3123938 9.87867966,91.7695006 C9.33578644,91.2266074 9,90.4766074 9,89.6481802 L9,89.6481802 L9,68 L4,68 C3.17157288,68 2.42157288,67.6642136 1.87867966,67.1213203 C1.33578644,66.5784271 1,65.8284271 1,65 L1,65 L1,57 C1,56.1715729 1.33578644,55.4215729 1.87867966,54.8786797 C2.42157288,54.3357864 3.17157288,54 4,54 L4,54 L9,54 L9,39.1418236 C9,37.6185618 9.43258641,36.1614083 10.2067447,34.9166985 C10.980903,33.6719886 12.0966331,32.6397224 13.4629206,31.9662352 L13.4629206,31.9662352 L60.0539724,9 L142.86761,9 Z"></path>
                  <rect x="61" y="1" width="81" height="8" rx="3"></rect>
                </g>
                <g fill="#00BFFF" clipPath="url(#tank-clip-path)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 2250" y={height + "%"}>
                    <path d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,234.7C672,267,768,277,864,261.3C960,245,1056,203,1152,186.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    <rect x="0" y="315" width="100%" height="100%"></rect>
                  </svg>
                </g>
              </svg>
            </div>
          </div>
        ) : (
          <NotAvailable />
        )}
      </Card>
    </div>
  )
}
