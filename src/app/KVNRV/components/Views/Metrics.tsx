import React, { useEffect, useState } from "react"
import Battery from "../Battery"
import DcLoads from "../DcLoads"
import PvCharger from "../PvCharger"
import AcLoads from "../AcLoads"
import Status from "../Status"
import ShorePower from "../ShorePower"
import AcMode from "../AcMode"
import Paginator from "../Paginator"
import { BigTank, SmallTank } from "../Tanks"
import { TANKS_CONF } from "../../utils/constants"

export const SCREEN_SIZES = {
  SM: 300,
  MD: 750,
  LG: 1250,
}

export const Metrics = () => {
  let [pages, setPages] = useState(1)
  let [currentPage, setCurrentPage] = useState(0)

  const computePages = () => {
    if (window.innerWidth >= SCREEN_SIZES.LG) {
      setPages(1)
      setCurrentPage(Math.min(0, currentPage))
    } else if (window.innerWidth >= SCREEN_SIZES.MD) {
      setPages(2)
      setCurrentPage(Math.min(1, currentPage))
    } else if (window.innerWidth >= SCREEN_SIZES.SM) {
      setPages(3)
    }
  }
  window.onresize = computePages
  useEffect(() => {
    computePages()
  })

  const getClassName = (elPage: number) => {
    let c = ""
    switch (pages) {
      case 1:
        c = "col-span-4"
        break
      case 2:
        c = "col-span-6"
        break
      case 3:
        c = "col-span-12"
        break
    }

    if (pages === 2) {
      if (currentPage === 0 && elPage === 2) {
        c += " hidden"
      } else if (currentPage === 1 && elPage <= 1) {
        c += " hidden"
      }
    } else if (pages === 3) {
      if (elPage !== currentPage) {
        c += " hidden"
      }
    }

    return c
  }

  return (
    <div className="metrics-container">
      <div className="row">
        <div className={getClassName(0)}>
          <Status />

          <div className="row">
            <ShorePower />
            <DcLoads />
          </div>
        </div>

        <div className={getClassName(1)}>
          <Battery />

          <div className="row">
            <PvCharger />
            <AcLoads />
          </div>

          <AcMode />
        </div>

        <div className={getClassName(2)}>
          <BigTank tankId={TANKS_CONF.FRESH_WATER.DEVICE_ID!} conf={TANKS_CONF.FRESH_WATER} />

          <div className="row">
            <SmallTank tankId={TANKS_CONF.GRAY_WATER.DEVICE_ID!} conf={TANKS_CONF.GRAY_WATER} />
            <SmallTank tankId={TANKS_CONF.BLACK_WATER.DEVICE_ID!} conf={TANKS_CONF.BLACK_WATER} />
          </div>
        </div>
      </div>

      {pages > 1 && <Paginator pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </div>
  )
}

export default Metrics
