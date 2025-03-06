import { FC } from "react"
import { formatValue } from "../../../utils/formatters/generic"

interface Props {
  decreaseLimit: () => void
  increaseLimit: () => void
  value?: number
}

export const LimitAdjuster: FC<Props> = ({ decreaseLimit, increaseLimit, value }) => (
  <div className="flex justify-between items-center">
    <button
      className="w-28 md:w-36 lg:w-36 h-16 bg-surface-victronBlue border-0 rounded-md text-xl"
      onClick={decreaseLimit}
    >
      -
    </button>
    <div className="flex text-2xl md:text-2xl mx-2">
      <span>{formatValue(value ?? 0)}</span>
      <span className="text-content-victronGray pl-1">A</span>
    </div>
    <button
      className="w-28 md:w-36 lg:w-36 h-16 bg-surface-victronBlue border-0 rounded-md text-xl"
      onClick={increaseLimit}
    >
      +
    </button>
  </div>
)
