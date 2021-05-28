import React, { useEffect, useRef, useState } from "react"
// @ts-ignore
import Hammer from "hammerjs"

import Battery from "../Battery"
import DcLoads from "../DcLoads"
import PvCharger from "../PvCharger"
import AcLoads from "../AcLoads"
import Status from "../Status"
import AcMode from "../AcMode"
import Paginator from "../Paginator"
import { SmallTank } from "../Tanks"
import { TANKS_CONF } from "../../utils/constants"
import { SIZE_WIDE, SIZE_LONG } from "../../../components/Card"

export const SCREEN_SIZES = {
  TALL: {
    SIZE: 700,
    SM: 300,
    MD: 670,
    LG: 1280,
  },
  SHORT: {
    SIZE: 700,
    XS: 500,
    SM: 700,
    MD: 800,
    LG: 1200,
  },
}

export const Metrics = () => {
  let [pages, setPages] = useState(1)
  let [currentPage, setCurrentPage] = useState(0)
  let [layout, setLayout] = useState(<></>)
  const metricsRef = useRef<HTMLDivElement>(null)
  let [hammer, setHammer] = useState<HammerManager>(null!)

  useEffect(() => {
    if (metricsRef.current) {
      setHammer((prev) => {
        if (prev) {
          prev.destroy()
        }
        if (pages > 1) {
          const newHammer = new Hammer.Manager(metricsRef.current!)
          const Swipe = new Hammer.Swipe({ velocity: 0.6, direction: 2 | 4 })
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
        metricsRef.current!.style.marginLeft = "0"
      }
      const prev = () => {
        setCurrentPage((currentPage) => (currentPage < pages - 1 ? currentPage + 1 : currentPage))
        metricsRef.current!.style.marginLeft = "0"
      }
      hammer.on("swiperight", next)
      hammer.on("swipeleft", prev)

      hammer.on("hammer.input", (ev: HammerInput) => {
        if (metricsRef.current) {
          if (Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) {
            if ((ev.deltaX > 0 && currentPage !== 0) || (ev.deltaX < 0 && currentPage + 1 !== pages)) {
              metricsRef.current.style.marginLeft = ev.deltaX + "px"
            }
          }
          if (ev.isFinal) {
            metricsRef.current.style.marginLeft = "0"
          }
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hammer])

  const computePages = () => {
    let pageNum = 1
    let currPage = currentPage
    let size = window.innerHeight < SCREEN_SIZES.SHORT.SIZE ? SCREEN_SIZES.SHORT : SCREEN_SIZES.TALL
    if (window.innerWidth < size.MD || window.innerHeight < size.SIZE) {
      pageNum = 3
    } else if (window.innerWidth < size.LG || window.innerHeight < size.SIZE) {
      pageNum = 2
      currPage = Math.min(1, currentPage)
    } else if (window.innerWidth >= size.LG) {
      pageNum = 1
      currPage = Math.min(0, currentPage)
    }

    if (window.innerHeight < SCREEN_SIZES.SHORT.SIZE) {
      setLayout(
        <div className="row">
          <div className={[getClassName(), "row", getIsHidden(0, pageNum, currPage)].join(" ")}>
            <Status size={[SIZE_WIDE, SIZE_LONG]} />
            <div className={window.innerWidth < size.SM ? "row" : "col-span-4 grid"}>
              <Battery size={[SIZE_WIDE, SIZE_LONG]} />
            </div>
          </div>

          <div className={[getClassName(), getIsHidden(1, pageNum, currPage)].join(" ")}>
            <AcMode />
            <div className="row">
              <DcLoads />
              <AcLoads />
            </div>
          </div>

          <div className={["row", "grid", getClassName(), getIsHidden(2, pageNum, currPage)].join(" ")}>
            <div className={"row"}>
              <PvCharger />
              <SmallTank tankId={TANKS_CONF.FRESH_WATER.DEVICE_ID!} conf={TANKS_CONF.FRESH_WATER} invert={true} />
            </div>
            <div className={"row"}>
              <SmallTank tankId={TANKS_CONF.GRAY_WATER.DEVICE_ID!} conf={TANKS_CONF.GRAY_WATER} invert={false} />
              <SmallTank tankId={TANKS_CONF.BLACK_WATER.DEVICE_ID!} conf={TANKS_CONF.BLACK_WATER} invert={false} />
            </div>
          </div>
        </div>
      )
    } else {
      setLayout(
        <div className="row">
          <div className={[getClassName(), getIsHidden(0, pageNum, currPage)].join(" ")}>
            <Status size={[SIZE_WIDE, SIZE_LONG]} />

            <div className="row">
              <DcLoads />
              <AcLoads />
            </div>
          </div>

          <div className={["grid", getClassName(), getIsHidden(1, pageNum, currPage)].join(" ")}>
            <Battery size={[SIZE_WIDE, SIZE_LONG]} />
            <AcMode />
          </div>

          <div className={[getClassName(), getIsHidden(2, pageNum, currPage)].join(" ")}>
            <div className="row">
              <PvCharger />
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

    setCurrentPage(currPage)
    setPages(pageNum)
  }

  useEffect(() => {
    window.addEventListener("resize", computePages)
    window.addEventListener("orientationchange", computePages)
    setTimeout(() => computePages(), 200)
    return () => {
      window.removeEventListener("resize", computePages)
      window.removeEventListener("orientationchange", computePages)
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

  const getIsHidden = (elPage: number, pageNum: number, currPage: number) => {
    let c = ""

    if (pageNum === 2) {
      if (currPage === 0 && elPage === 2) {
        c += " hidden"
      } else if (currPage === 1 && elPage <= 1) {
        c += " hidden"
      }
    } else if (pageNum >= 3) {
      if (elPage !== currPage) {
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
