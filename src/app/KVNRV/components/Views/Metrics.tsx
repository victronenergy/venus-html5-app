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
import { SIZE_BIG, SIZE_LONG, SIZE_SMALL } from "../../../components/Card"

export const SCREEN_SIZES = {
  SM: 300,
  MD: 750,
  LG: 1250,
  SHORT: 700,
}

export const Metrics = () => {
  let [pages, setPages] = useState(1)
  let [currentPage, setCurrentPage] = useState(0)
  let [layout, setLayout] = useState(<></>)

  const computePages = () => {
    let pageNum = 1
    if (window.innerWidth >= SCREEN_SIZES.LG) {
      pageNum = 1
      setCurrentPage(Math.min(0, currentPage))
    } else if (window.innerWidth >= SCREEN_SIZES.MD) {
      pageNum = 2
      setCurrentPage(Math.min(1, currentPage))
    } else if (window.innerWidth >= SCREEN_SIZES.SM) {
      pageNum = 3
    }
    setPages(pageNum)

    if (window.innerHeight < SCREEN_SIZES.SHORT) {
      setLayout(
        <div className="row">
          <div className={"row " + getIsHidden(0, pageNum)}>
            <Status size={[SIZE_SMALL, SIZE_LONG]} />
            <div className={""}>
              <div className="row">
                <Battery size={SIZE_SMALL} />
                <ShorePower />
              </div>

              <AcMode />
            </div>
          </div>

          <div className={"grid " + getIsHidden(1, pageNum)}>
            <DcLoads />
            <AcLoads />
          </div>

          <div className={"row " + getIsHidden(2, pageNum)}>
            <BigTank tankId={TANKS_CONF.FRESH_WATER.DEVICE_ID!} conf={TANKS_CONF.FRESH_WATER} />

            <div className="grid">
              <SmallTank tankId={TANKS_CONF.GRAY_WATER.DEVICE_ID!} conf={TANKS_CONF.GRAY_WATER} />
              <SmallTank tankId={TANKS_CONF.BLACK_WATER.DEVICE_ID!} conf={TANKS_CONF.BLACK_WATER} />
            </div>
          </div>
        </div>
      )
    } else {
      setLayout(
        <div className="row">
          <div className={[getClassName(), getIsHidden(0, pageNum)].join(" ")}>
            <Status size={[SIZE_BIG, SIZE_LONG]} />

            <div className="row">
              <PvCharger />
              <ShorePower />
            </div>
          </div>

          <div className={[getClassName(), getIsHidden(1, pageNum)].join(" ")}>
            <Battery size={SIZE_BIG} />

            <div className="row">
              <DcLoads />
              <AcLoads />
            </div>

            <AcMode />
          </div>

          <div className={[getClassName(), getIsHidden(2, pageNum)].join(" ")}>
            <BigTank tankId={TANKS_CONF.FRESH_WATER.DEVICE_ID!} conf={TANKS_CONF.FRESH_WATER} />

            <div className="row">
              <SmallTank tankId={TANKS_CONF.GRAY_WATER.DEVICE_ID!} conf={TANKS_CONF.GRAY_WATER} />
              <SmallTank tankId={TANKS_CONF.BLACK_WATER.DEVICE_ID!} conf={TANKS_CONF.BLACK_WATER} />
            </div>
          </div>
        </div>
      )
    }
  }

  window.onresize = computePages
  useEffect(() => {
    computePages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const getClassName = () => {
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

    return c
  }

  const getIsHidden = (elPage: number, pageNum: number) => {
    let c = ""

    if (pageNum === 2) {
      if (currentPage === 0 && elPage === 2) {
        c += " hidden"
      } else if (currentPage === 1 && elPage <= 1) {
        c += " hidden"
      }
    } else if (pageNum === 3) {
      if (elPage !== currentPage) {
        c += " hidden"
      }
    }
    return c
  }

  return (
    <div className="metrics-container">
      {layout}

      {pages > 1 && <Paginator pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </div>
  )
}

export default Metrics
