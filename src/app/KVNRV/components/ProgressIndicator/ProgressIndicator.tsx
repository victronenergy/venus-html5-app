import React from "react"
import "./ProgressIndicator.scss"

type ProgressIndicatorProps = {
  percent: number
  level: string
}

const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const styles = { width: props.percent * 100 + "%" }

  return (
    <div className="progress-indicator">
      <div className={"progress-indicator__bar " + props.level} style={styles} />
    </div>
  )
}

export default ProgressIndicator
