import React from "react"
import "./ProgressIndicator.scss"

type ProgressIndicatorProps = {
  percent: number
  level: string
}

export const ProgressIndicator = (props: ProgressIndicatorProps) => {
  let percent = props.percent * 100
  if (percent < 5) {
    percent = 0
  } else if (percent < 10) {
    percent = 10
  }
  const styles = { width: percent + "%" }

  return (
    <div className="progress-indicator">
      <div className={"progress-indicator__bar " + props.level} style={styles} />
    </div>
  )
}

export default ProgressIndicator
