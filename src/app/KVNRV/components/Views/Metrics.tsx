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
import { SIZE_WIDE, SIZE_LONG } from "../../../components/Card"

export const SCREEN_SIZES = {
  MD: 499,
  LG: 760,
  XL: 1366,
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
          const Swipe = new Hammer.Swipe({ velocity: 0.2, direction: 2 | 4, threshold: 10 })
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
              ;(metricsRef.current.children[0] as HTMLDivElement).style.transform = `translateX(${ev.deltaX}px)`
            }
          }
          if (ev.isFinal) {
            ;(metricsRef.current.children[0] as HTMLDivElement).style.transform = "translateX(0)"
          }
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hammer])

  const computePages = () => {
    // under 16/10 aspect ratio
    const RATIO = 16 / 9
    const isNarrow = window.innerWidth / window.innerHeight > RATIO || window.innerHeight < 480
    const isTall =
      !isNarrow &&
      window.innerWidth > SCREEN_SIZES.LG &&
      window.innerWidth < SCREEN_SIZES.XL &&
      window.innerHeight > 900

    let pageNum = 3

    if (isNarrow) {
      if (window.innerWidth > SCREEN_SIZES.MD * RATIO) {
        pageNum = 2
      }
      if (window.innerWidth > SCREEN_SIZES.LG * RATIO) {
        pageNum = 1
      }
    } else {
      if (window.innerWidth > SCREEN_SIZES.MD) {
        pageNum = 2
      }
      if (window.innerWidth > SCREEN_SIZES.LG || isTall) {
        pageNum = 1
      }
    }

    const currPage = Math.min(pageNum - 1, currentPage)

    if (isNarrow) {
      setLayout(
        <div className="row">
          {isVisible(0, pageNum, currPage) && (
            <div className={"row"}>
              <Status size={[SIZE_WIDE, SIZE_LONG]} />
              <Battery size={[SIZE_WIDE, SIZE_LONG]} />
            </div>
          )}

          {isVisible(1, pageNum, currPage) && (
            <div>
              <AcMode />
              <div className="row">
                <DcLoads />
                <AcLoads />
              </div>
            </div>
          )}

          {isVisible(2, pageNum, currPage) && (
            <div>
              <div className="row">
                <PvCharger />
                <SmallTank tankId={0} />
              </div>
              <div className="row">
                <SmallTank tankId={1} />
                <SmallTank tankId={2} />
              </div>
            </div>
          )}
        </div>
      )
    } else {
      setLayout(
        <div className="row">
          {isVisible(0, pageNum, currPage) && (
            <div>
              <Status size={[SIZE_WIDE, SIZE_LONG]} />

              <div className="row">
                <DcLoads />
                <AcLoads />
              </div>
              {isTall && (
                <div className="row">
                  <PvCharger />
                  <SmallTank tankId={0} />
                </div>
              )}
            </div>
          )}

          {isVisible(1, pageNum, currPage) && (
            <div className={"grid"}>
              <Battery size={[SIZE_WIDE, SIZE_LONG]} />
              <AcMode />
              {isTall && (
                <div className="row">
                  <SmallTank tankId={1} />
                  <SmallTank tankId={2} />
                </div>
              )}
            </div>
          )}

          {!isTall && isVisible(2, pageNum, currPage) && (
            <div>
              <div className="row">
                <PvCharger />
                <SmallTank tankId={0} />
              </div>
              <div className="row">
                <SmallTank tankId={1} />
                <SmallTank tankId={2} />
              </div>
            </div>
          )}
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

  const isVisible = (elPage: number, pageNum: number, currPage: number) => {
    if (pageNum === 2) {
      if (currPage === 0 && elPage === 2) {
        return false
      } else if (currPage === 1 && elPage <= 1) {
        return false
      }
    } else if (pageNum >= 3) {
      if (elPage !== currPage) {
        return false
      }
    }
    return true
  }

  return (
    <div className="metrics-container" ref={metricsRef}>
      {layout}
      {pages > 1 && <Paginator pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </div>
  )
}

export default Metrics
