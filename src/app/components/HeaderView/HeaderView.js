import React from "react"
import PropTypes from "prop-types"

import "./HeaderView.scss"

const HeaderView = props => (
  <div className={props.child ? "header-view__child" : "metric"}>
    <img src={props.icon} className="metric__icon" />
    <div className={"metric__value-container"}>
      <p className="text text--medium">{props.title}</p>
      {props.children}
    </div>
  </div>
)

HeaderView.propTypes = {
  child: PropTypes.bool,
  icon: PropTypes.string
}

export default HeaderView
