import React from "react"
import PropTypes from "prop-types"

import "./HeaderView.scss"

const MAX_TITLE_LENGTH = 21

const HeaderView = ({ child, children, icon, title = "", subTitle = "" }) => (
  <div className={child ? "header-view__child" : "metric"}>
    <img src={icon} className="metric__icon" />
    <div className={"metric__value-container"}>
      {title.length <= MAX_TITLE_LENGTH ? (
        <p className="text text--medium">{title}</p>
      ) : (
        <p className="text text--medium">
          {title.slice(0, MAX_TITLE_LENGTH)}
          &hellip;{" "}
        </p>
      )}
      {subTitle && <p className="text text--smaller text--opaque">{subTitle}</p>}
      {children}
    </div>
  </div>
)

HeaderView.propTypes = {
  child: PropTypes.bool,
  icon: PropTypes.string
}

export default HeaderView
