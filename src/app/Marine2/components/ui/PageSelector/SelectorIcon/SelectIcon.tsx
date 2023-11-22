import { FC } from "react"
import classNames from "classnames"
import SelectorLeftIcon from "../../../../images/icons/selectors/selector-left.svg"
import SelectorUpIcon from "../../../../images/icons/selectors/selector-up.svg"
import SelectorRightIcon from "../../../../images/icons/selectors/selector-right.svg"
import SelectorDownIcon from "../../../../images/icons/selectors/selector-down.svg"

interface Props {
  direction: "previous" | "next"
  disabled: boolean
  isHorizontal: boolean
}

export const SelectorIcon: FC<Props> = ({
  direction,
  disabled,
  isHorizontal,
}) => {
  const classes = classNames({
    "text-victron-gray dark:text-victron-gray-dark": disabled,
    "text-victron-blue dark:text-victron-blue-dark": !disabled,
  })

  if (isHorizontal) {
    return direction === "previous" ? (
      <SelectorLeftIcon className={classes} />
    ) : (
      <SelectorRightIcon className={classes} />
    )
  }

  return direction === "previous" ? (
    <SelectorUpIcon className={classes} />
  ) : (
    <SelectorDownIcon className={classes} />
  )
}
