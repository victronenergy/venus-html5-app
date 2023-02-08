import React from "react"
import classnames from "classnames"

import "./ListView.scss"

type ListViewProps = {
  child: boolean
  icon: string
  title: string | React.ReactNode
  subTitle: string | React.ReactNode
}

export const ListView: React.FunctionComponent<ListViewProps> = ({ child, icon, title, subTitle, children }) => (
  <div className={classnames({ metric: !child }, "list-view")}>
    <div className="list-view__header">
      <img src={icon} className="metric__icon" alt={"List View Icon"} />
      <div className="metric__value-container">
        <p className="text text--title text--bold">{title}</p>
        {subTitle && <span className="text text--smaller text--opaque">{subTitle}</span>}
      </div>
    </div>
    {children && <div className="list-view__rows">{children}</div>}
  </div>
)

export const ListRow: React.FunctionComponent<any> = ({ children }) => <div className="list-row">{children}</div>
