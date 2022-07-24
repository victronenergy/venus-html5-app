import React from "react"
import classnames from "classnames"

import "./ListViewWithTotals.scss"

type ListViewWithTotalsProps = {
  child: boolean
  icon: string
  title: string | React.ReactNode
  totals: number
  subTitle: string | React.ReactNode
}

export const ListViewWithTotals: React.FunctionComponent<ListViewWithTotalsProps> = ({
  child,
  icon,
  title,
  totals,
  subTitle,
  children,
}) => (
  <div className={classnames({ metric: !child }, "list-view")}>
    <div className="list-view__header">
      <img src={icon} className="metric__icon" alt={"List View Icon"} />
      <div className="metric__value-container">
        <div className="widget--header">
          <div className="text text--title text--bold">
            <p className="text--title--left">{title}</p>
          </div>
          <div className="text text--title text--bold">
            <p className="text--power--totals">{totals.toFixed()} W</p>
          </div>
        </div>
        {subTitle && <span className="text text--smaller text--opaque">{subTitle}</span>}
      </div>
    </div>
    {children && <div className="list-view__rows">{children}</div>}
  </div>
)

export const ListRow: React.FunctionComponent<any> = ({ children }) => <div className="list-row">{children}</div>
