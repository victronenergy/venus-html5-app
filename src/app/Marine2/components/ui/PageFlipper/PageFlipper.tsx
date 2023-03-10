import PageSelector, { PageSelectorProps } from "../PageSelector"
import classnames from "classnames"
import React, { useState, useRef, useEffect } from "react"
import { useComponentSize } from "../../../utils/hooks"

const PageFlipper = ({ children, pageSelectorPropsSetter, pages }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const componentSize = useComponentSize(wrapperRef)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    if (pageSelectorPropsSetter) {
      pageSelectorPropsSetter({
        onClickLeft: () => setCurrentPage(currentPage - 1),
        onClickRight: () => setCurrentPage(currentPage + 1),
        currentPage: currentPage,
        maxPages: pages,
      })
    }
  }, [currentPage, pageSelectorPropsSetter, pages])
  useEffect(() => {
    console.log(componentSize)
    if (!!pageRef.current) {
      pageRef.current.scrollTo({
        left: currentPage * pageRef.current.offsetWidth,
        behavior: "smooth",
      })
    }
  }, [componentSize, currentPage])

  return (
    <div
      ref={wrapperRef}
      className={classnames("w-full h-full", {
        "flex flex-col justify-between": !pageSelectorPropsSetter,
      })}
    >
      <div
        ref={pageRef}
        className={classnames("overflow-hidden w-full", {
          "h-[calc(100%-3.5rem)]": !pageSelectorPropsSetter,
          "h-full": !!pageSelectorPropsSetter,
        })}
      >
        {children}
      </div>
      {!pageSelectorPropsSetter && (
        <PageSelector
          onClickLeft={() => {
            setCurrentPage(currentPage - 1)
          }}
          onClickRight={() => {
            setCurrentPage(currentPage + 1)
          }}
          currentPage={currentPage}
          maxPages={pages}
        ></PageSelector>
      )}
    </div>
  )
}

interface Props {
  children: JSX.Element
  pages: number
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

export default PageFlipper
