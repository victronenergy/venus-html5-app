import React from "react"
import classNames from "classnames"

const FadedText = ({ text, className }: Props) => {
  return <span className={classNames("truncate whitespace-nowrap w-full overflow-hidden", className)}>{text}</span>
}

interface Props {
  text?: string
  className?: string
}

export default FadedText
