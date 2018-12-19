import React from "react"
import PropTypes from "prop-types"
import "./HeaderView.scss"

const HeaderView = props => (
  <div className={"metric" + (props.small ? " metric--small" : "")}>
    <img src={props.icon} className="metric__icon" />
    <div className={"metric__value-container" + (props.centered ? " metric__value-container--centered" : "")}>
      {props.children}
    </div>
  </div>
)

export const HeaderTitle = props => <p className="text text--medium">{props.children}</p>

HeaderView.propTypes = {
  small: PropTypes.bool,
  centered: PropTypes.bool,
  icon: PropTypes.string
}

export default HeaderView
