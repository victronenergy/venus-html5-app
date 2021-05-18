import React, { useEffect, useRef, useState } from "react"
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
  TALL: {
    SM: 300,
    MD: 850,
    LG: 1250,
  },
  SHORT: {
    SIZE: 750,
    SM: 670,
    MD: 975,
    LG: 1500,
  },
}

export const Metrics = () => {
  let [pages, setPages] = useState(1)
  let [currentPage, setCurrentPage] = useState(0)
  let [layout, setLayout] = useState(<></>)
  const metricsRef = useRef<HTMLDivElement>(null)

  const computePages = () => {
    let pageNum = 1
    let size = window.innerHeight < SCREEN_SIZES.SHORT.SIZE ? SCREEN_SIZES.SHORT : SCREEN_SIZES.TALL
    if (window.innerWidth < size.MD) {
      pageNum = 3
    } else if (window.innerWidth < size.LG) {
      pageNum = 2
      setCurrentPage(Math.min(1, currentPage))
    } else if (window.innerWidth >= size.LG) {
      pageNum = 1
      setCurrentPage(Math.min(0, currentPage))
    }
    setPages(pageNum)

    if (window.innerHeight < SCREEN_SIZES.SHORT.SIZE) {
      setLayout(
        <div className="row">
          <div className={[getClassName(), "row", getIsHidden(0, pageNum)].join(" ")}>
            <Status size={[SIZE_BIG, SIZE_LONG]} />

            <div className={window.innerWidth < size.SM ? "row" : "col-span-4"}>
              <Battery size={SIZE_SMALL} />
              <ShorePower />
            </div>
          </div>

          <div className={[getClassName(), getIsHidden(1, pageNum)].join(" ")}>
            <AcMode />

            <div className="row">
              <DcLoads />
              <AcLoads />
            </div>
          </div>

          <div className={["row", getClassName(), getIsHidden(2, pageNum)].join(" ")}>
            <BigTank tankId={TANKS_CONF.FRESH_WATER.DEVICE_ID!} conf={TANKS_CONF.FRESH_WATER} />

            <div className={window.innerWidth < size.SM ? "row" : "col-span-4"}>
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

  const computeChildrenSize = (el: Element | null | undefined, property: string) => {
    if (!el) {
      return null
    }
    return Array.from(el.children)
      .map((child) => child[property as keyof Element] as number)
      .reduce((a: number, b: number) => a + b, 0)
  }

  const scaleMetrics = () => {
    let screenHeight = window.innerHeight * 0.8
    let screenWidth = window.innerWidth

    let childrenWidth = computeChildrenSize(metricsRef.current?.children[0], "clientWidth")
    let childrenHeight = computeChildrenSize(metricsRef.current, "clientHeight")
    if (childrenWidth && childrenHeight) {
      let heightRatio = childrenHeight / screenHeight
      let widthRatio = childrenWidth / screenWidth
      let ratio = Math.max(heightRatio, widthRatio)

      console.log(ratio)
      if (metricsRef.current && ratio > 1) {
        ratio = ratio > 1 ? 0 : 1 - ratio
        let scaleFactor = 1 + ratio
        metricsRef.current.style.fontSize = scaleFactor + "rem"
      }
    }
  }

  useEffect(() => {
    function resizeHandler() {
      scaleMetrics()
      computePages()
    }
    window.addEventListener("resize", resizeHandler)
    setTimeout(resizeHandler, 100)
    return () => {
      window.removeEventListener("resize", resizeHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    <div className="metrics-container" ref={metricsRef}>
      {layout}

      {pages > 1 && <Paginator pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </div>
  )
}

export default Metrics
