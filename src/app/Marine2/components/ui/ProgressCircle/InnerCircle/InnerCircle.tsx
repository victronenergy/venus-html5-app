import { FC } from "react"

interface Props {
  radius: number
  percentage?: number
  strokeDashArray: string
  classes: string
}

export const InnerCircle: FC<Props> = ({ radius, percentage, strokeDashArray, classes }) => {
  if (!percentage || percentage === 0) {
    return null
  }

  return (
    <circle
      r={radius}
      cx="50%"
      cy="50%"
      strokeDasharray={strokeDashArray}
      strokeDashoffset={0}
      strokeLinecap="round"
      className={classes}
      style={{ transition: "stroke-dasharray .5s ease" }}
    />
  )
}
