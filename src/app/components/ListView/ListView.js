import React from "react"
import classnames from "classnames"

import "./ListView.scss"

export const ListView = props => (
  <div className={classnames({ metric: !props.child }, "list-view")}>
    <div className="list-view__header">
      <img src={props.icon} className="metric__icon" />
      <div className="metric__value-container">
        <p className="text text--medium">{props.title}</p>
        <span className="text text--smaller text--opaque">{props.subTitle}</span>
      </div>
    </div>
    <div className="list-view__rows">{props.children}</div>
  </div>
)

export const ListRow = ({ children }) => <div className="list-row">{children}</div>
