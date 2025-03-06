import React from "react"

// todo: add color and className props

const Spinner = () => {
  return (
    <div className="w-24 h-24 -ml-12">
      <div className="w-24 h-24 rounded-full absolute border-8 border-solid border-content-victronBlue opacity-50"></div>
      <div className="w-24 h-24 rounded-full animate-spin absolute border-8 border-solid border-content-victronBlue border-t-transparent"></div>
    </div>
  )
}

export default Spinner
