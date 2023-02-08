import React from "react"

import "./HeaderView.scss"

const MAX_TITLE_LENGTH = 40

type HeaderViewProps = {
  child?: boolean
  icon: string
  title?: string
  subTitle?: string
  showBoat?: boolean
}

const HeaderView: React.FunctionComponent<HeaderViewProps> = ({
  child = false,
  children,
  icon,
  title = "",
  subTitle = "",
  showBoat = false,
}) => (
  <div className={(child ? "header-view__child" : "metric") + ((showBoat && " boat-image") || "")}>
    <img src={icon} className="metric__icon" alt={"Header View Icon"} />
    <div className={"metric__value-container"}>
      {title.length <= MAX_TITLE_LENGTH ? (
        <p className="text--title">{title}</p>
      ) : (
        <p className="text--title">
          {title.slice(0, MAX_TITLE_LENGTH)}
          &hellip;{" "}
        </p>
      )}
      {subTitle && <p className="text--subtitle">{subTitle}</p>}
      {children}
    </div>
  </div>
)

export default HeaderView
