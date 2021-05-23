import React, { useEffect, useRef, useState } from "react"
import Hammer from "hammerjs"

import Battery from "../Battery"
import DcLoads from "../DcLoads"
import PvCharger from "../PvCharger"
import AcLoads from "../AcLoads"
import Status from "../Status"
import AcMode from "../AcMode"
import Paginator from "../Paginator"
import { BigTank, SmallTank } from "../Tanks"
import { TANKS_CONF } from "../../utils/constants"
import { SIZE_WIDE, SIZE_LONG } from "../../../components/Card"

export const SCREEN_SIZES = {
  TALL: {
    SIZE: 750,
    SM: 300,
    MD: 650,
    LG: 1280,
  },
  SHORT: {
    SIZE: 600,
    SM: 670,
    MD: 800,
    LG: 1200,
  },
}

export const Metrics = () => {
  let [pages, setPages] = useState(1)
  let [currentPage, setCurrentPage] = useState(0)
  let [layout, setLayout] = useState(<></>)
  const metricsRef = useRef<HTMLDivElement>(null)
  let [hammer, setHammer] = useState(undefined as Hammer.Manager)

  useEffect(() => {
    if (metricsRef.current) {
      setHammer((prev: Hammer.Manager) => {
        if (!prev) {
          const newHammer = new Hammer.Manager(metricsRef.current)
          const Swipe = new Hammer.Swipe({ velocity: 0.5, direction: 2 | 4 })
          newHammer.add(Swipe)
          return newHammer
        } else {
          return prev
        }
      })
    }
  }, [currentPage, pages])

  useEffect(() => {
    if (hammer) {
      const next = () => {
        setCurrentPage((currentPage) => (currentPage > 0 ? currentPage - 1 : currentPage))
      }
      const prev = () => {
        setCurrentPage((currentPage) => (currentPage < pages - 1 ? currentPage + 1 : currentPage))
      }
      hammer.on("swiperight", next)
      hammer.on("swipeleft", prev)
    }
  }, [hammer])

  const computePages = () => {
    let pageNum = 1
    let size = window.innerHeight < SCREEN_SIZES.SHORT.SIZE ? SCREEN_SIZES.SHORT : SCREEN_SIZES.TALL
    if (window.innerWidth < size.MD) {
      pageNum = 3
    } else if (window.innerWidth < size.LG || window.innerHeight < size.SIZE) {
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
            <Status size={[SIZE_WIDE, SIZE_LONG]} />

            <div className={window.innerWidth < size.SM ? "row" : "col-span-4 grid"}>
              <Battery size={[SIZE_WIDE, SIZE_LONG]} />
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
            <BigTank tankId={TANKS_CONF.FRESH_WATER.DEVICE_ID!} conf={TANKS_CONF.FRESH_WATER} invert={true} />

            <div className={window.innerWidth < size.SM ? "row" : "col-span-4 grid"}>
              <SmallTank tankId={TANKS_CONF.GRAY_WATER.DEVICE_ID!} conf={TANKS_CONF.GRAY_WATER} invert={false} />
              <SmallTank tankId={TANKS_CONF.BLACK_WATER.DEVICE_ID!} conf={TANKS_CONF.BLACK_WATER} invert={false} />
            </div>
          </div>
        </div>
      )
    } else {
      setLayout(
        <div className="row">
          <div className={[getClassName(), getIsHidden(0, pageNum)].join(" ")}>
            <Status size={[SIZE_WIDE, SIZE_LONG]} />

            <div className="row">
              <PvCharger />
              <AcLoads />
            </div>
          </div>

          <div className={["grid", getClassName(), getIsHidden(1, pageNum)].join(" ")}>
            <Battery size={[SIZE_WIDE, SIZE_LONG]} />
            <AcMode />
          </div>

          <div className={[getClassName(), getIsHidden(2, pageNum)].join(" ")}>
            <div className="row">
              <DcLoads />
              <SmallTank tankId={TANKS_CONF.FRESH_WATER.DEVICE_ID!} conf={TANKS_CONF.FRESH_WATER} invert={true} />
            </div>
            <div className="row">
              <SmallTank tankId={TANKS_CONF.GRAY_WATER.DEVICE_ID!} conf={TANKS_CONF.GRAY_WATER} invert={false} />
              <SmallTank tankId={TANKS_CONF.BLACK_WATER.DEVICE_ID!} conf={TANKS_CONF.BLACK_WATER} invert={false} />
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
    let screenWidth = window.innerWidth * 0.95

    let childrenWidth = computeChildrenSize(metricsRef.current?.children[0], "clientWidth")
    let childrenHeight = computeChildrenSize(metricsRef.current, "clientHeight")
    if (childrenWidth && childrenHeight) {
      let heightRatio = childrenHeight / screenHeight
      let widthRatio = childrenWidth / screenWidth
      let ratio = Math.max(heightRatio, widthRatio)

      if (metricsRef.current) {
        ratio = ratio > 1 ? 0 : 1 - ratio * 1.1
        let scaleFactor = 1 + ratio
        metricsRef.current.style.fontSize = scaleFactor + "rem"
      }
    }
  }

  useEffect(() => {
    function resizeHandler() {
      setTimeout(() => {
        scaleMetrics()
        computePages()
      }, 200)
    }
    window.addEventListener("resize", resizeHandler)
    window.addEventListener("orientationchange", resizeHandler)
    setTimeout(resizeHandler, 50)
    return () => {
      window.removeEventListener("resize", resizeHandler)
      window.removeEventListener("orientationchange", resizeHandler)
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
