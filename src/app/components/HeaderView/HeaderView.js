import React from "react"
import PropTypes from "prop-types"

import "./HeaderView.scss"

const HeaderView = ({ child, children, icon, title }) => (
  <div className={child ? "header-view__child" : "metric"}>
    <img src={icon} className="metric__icon" />
    <div className={"metric__value-container"}>
      <p className="text text--medium">{title}</p>
      {children}
    </div>
  </div>
)

HeaderView.propTypes = {
  child: PropTypes.bool
  // TODO: This breaks in tests, try to fix!
  // icon: PropTypes.string
}

export default HeaderView
