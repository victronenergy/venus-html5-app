import React from "react"
import PropTypes from "prop-types"

import "./HeaderView.scss"

const MAX_TITLE_LENGTH = 40

const HeaderView = ({ child, children, icon, title = "", subTitle = "", showBoat = "" }) => (
  <div className={(child ? "header-view__child" : "metric") + (showBoat && " boat-image")}>
    <img src={icon} className="metric__icon" />
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

HeaderView.propTypes = {
  child: PropTypes.bool,
  icon: PropTypes.string
}

export default HeaderView
