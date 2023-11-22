import { BaseSyntheticEvent, FC } from "react"
import classNames from "classnames"
import SelectorLeftIcon from "../../../../images/icons/selectors/selector-left.svg"
import SelectorUpIcon from "../../../../images/icons/selectors/selector-up.svg"
import SelectorRightIcon from "../../../../images/icons/selectors/selector-right.svg"
import SelectorDownIcon from "../../../../images/icons/selectors/selector-down.svg"

interface Props {
  onClick: (e: BaseSyntheticEvent) => void
  direction: "previous" | "next"
  disabled: boolean
  isHorizontal: boolean
}

export const SelectorButton: FC<Props> = ({ onClick, direction, disabled, isHorizontal }) => {
  const buttonClasses = "w-[44px] h-[44px] shrink-0 cursor-pointer"
  const iconClasses = classNames({
    "text-victron-gray dark:text-victron-gray-dark": disabled,
    "text-victron-blue dark:text-victron-blue-dark": !disabled,
  })

  if (isHorizontal) {
    return (
      <button type="button" onClick={onClick} className={buttonClasses}>
        {direction === "previous" ? (
          <SelectorLeftIcon className={iconClasses} />
        ) : (
          <SelectorRightIcon className={iconClasses} />
        )}
      </button>
    )
  }

  return (
    <button type="button" onClick={onClick} className={buttonClasses}>
      {direction === "previous" ? (
        <SelectorUpIcon className={iconClasses} />
      ) : (
        <SelectorDownIcon className={iconClasses} />
      )}
    </button>
  )
}
