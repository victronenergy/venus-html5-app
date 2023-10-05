import { ReactNode, useState } from "react"
import classnames from "classnames"
import { unit } from "@m2Types/data/unit"

interface Props {
  initialValue: number
  unit?: unit
  className?: string
  onChange?: (value: number) => void
  max?: number
  min?: number
  step?: number
  range?: number[]
}

const NumericInputButton = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={
        "bg-victron-blue/70 dark:bg-victron-blue-dark/70 border-victron-blue text-black dark:text-white cursor-pointer py-4 px-10 rounded-md text-lg"
      }
    >
      {children}
    </button>
  )
}

const NumericInputRange = ({
  onChange,
  range,
  className,
}: {
  onChange: (value: number) => void
  range: number[]
  className?: string
}) => {
  if (!range?.length) return null

  return (
    <div
      className={classnames(
        "flex justify-between items-center w-full rounded-md text-md border-victron-blue border-2 bg-victron-blue/30 dark:bg-victron-blue-dark/30 text-victron-gray-200 dark:text-white",
        className
      )}
    >
      {range.map((val) => (
        <div key={val} className={"py-2 px-3"} onClick={() => onChange(val)}>
          {val}
        </div>
      ))}
    </div>
  )
}

const NumericInput = ({ initialValue = 0, unit, onChange, className, min, max, step = 1, range }: Props) => {
  const [value, setValue] = useState(initialValue)

  const increase = () => {
    const newValue = max !== undefined ? Math.min(value + step, max) : value + step
    setValue(newValue)
    onChange && onChange(newValue)
  }

  const decrease = () => {
    const newValue = min !== undefined ? Math.max(value - step, min) : value - step
    setValue(newValue)
    onChange && onChange(newValue)
  }

  const setExactValue = (val: number) => {
    if ((max !== undefined && val > max) || (min !== undefined && val < min)) {
      return
    }
    setValue(val)
    onChange && onChange(val)
  }

  return (
    <div className={classnames(className)}>
      <div className={"flex justify-between items-center mt-4"}>
        <NumericInputButton onClick={decrease}>−</NumericInputButton>
        <div className={"text-2xl text-victron-darkGray dark:text-white"}>
          {value}
          <span className={"pl-0.5 text-victron-gray dark:text-victron-gray-500"}>{unit}</span>
        </div>
        <NumericInputButton onClick={increase}>+</NumericInputButton>
      </div>
      {range?.length && (
        <div>
          <NumericInputRange onChange={setExactValue} range={range} className={"mt-10 mb-2"} />
        </div>
      )}
    </div>
  )
}

export default NumericInput
