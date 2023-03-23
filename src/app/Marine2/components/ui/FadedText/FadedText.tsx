import React from "react"
import classNames from "classnames"

const FadedText = ({ text, className }: Props) => {
  return (
    <span
      className={classNames("whitespace-nowrap w-full overflow-hidden", className)}
      style={{
        maskImage: "linear-gradient(to right, rgba(0,0,0,1) 90%, rgba(0,0,0,0))",
        WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 90%, rgba(0,0,0,0))",
      }}
    >
      {text}
    </span>
  )
}

interface Props {
  text?: string
  className?: string
}

export default FadedText
