import Box from "../../ui/Box"
import { Battery as BatteryType } from "@elninotech/mfd-modules"
import BatteryIcon from "../../../images/icons/battery.svg"

const AuxiliaryBatteries = ({ batteries }: Props) => {
  return (
    <Box
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<BatteryIcon className="w-6 text-victron-gray dark:text-victron-gray-dark" />}
      title="Auxiliary Batteries"
      className="truncate"
    >
      <div className="whitespace-pre-wrap">
        {batteries.map((battery, idx) => (
          <div key={battery.name} className="grid grid-cols-9 items-center">
            <p className="text-victron-gray dark:text-white text-left text-base sm:text-lg md:text-xl lg:text-2xl  col-span-3">
              {battery.name}
            </p>
            <p className="text-victron-gray text-left text-base sm:text-lg md:text-xl lg:text-2xl  col-span-2">
              {battery.voltage.toFixed(1)} <span className="text-victron-gray-400">V</span>
            </p>
            <p className="text-victron-gray text-center text-base sm:text-lg md:text-xl lg:text-2xl  col-span-2">
              {battery.current.toFixed(1)} <span className="text-victron-gray-400">A</span>
            </p>
            <p className="text-victron-gray text-right text-base sm:text-lg md:text-xl lg:text-2xl  col-span-2">
              {battery.power.toFixed(1)} <span className="text-victron-gray-400">W</span>
            </p>
            {idx < batteries.length - 1 && <div className="col-span-9 my-1 border-[1px] border-victron-gray-200" />}
          </div>
        ))}
      </div>
    </Box>
  )
}

interface Props {
  batteries: BatteryType[]
}

export default AuxiliaryBatteries
