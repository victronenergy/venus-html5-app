import React from "react"

export default props => (
  <div className="loading">
    <p className="text text--very-large">Connecting</p>
    <div className="loading__dots">
      <p className="dot">.</p>
      <p className="dot two">.</p>
      <p className="dot three">.</p>
    </div>
  </div>
)
