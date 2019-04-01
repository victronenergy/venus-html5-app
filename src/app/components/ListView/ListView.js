import React from "react"
import classnames from "classnames"

import "./ListView.scss"

export const ListView = ({ child, children, icon, title, subTitle }) => (
  <div className={classnames({ metric: !child }, "list-view")}>
    <div className="list-view__header">
      <img src={icon} className="metric__icon" />
      <div className="metric__value-container">
        <p className="text text--title text--bold">{title}</p>
        {subTitle && <span className="text text--smaller text--opaque">{subTitle}</span>}
      </div>
    </div>
    {children && <div className="list-view__rows">{children}</div>}
  </div>
)

export const ListRow = ({ children }) => <div className="list-row">{children}</div>
