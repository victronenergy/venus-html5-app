import React from "react"
import classNames from "classnames"

interface Props {
  text?: string
  className?: string
}

const FadedText = ({ text, className }: Props) => (
  <span className={classNames("truncate whitespace-nowrap w-full overflow-hidden", className)}>{text}</span>
)

export default FadedText
