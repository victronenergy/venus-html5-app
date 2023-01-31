import React, { useRef, useEffect, useState } from 'react'
import PageSelector from '~/components/ui/PageSelector'
import classnames from 'classnames'
import useWindowSize from '~/utils/hooks/useWindowSize'

const Paginator = ({ children, orientation = 'horizontal', selectorLocation = 'bottom-full' }: Props) => {
  const childrenArray = Array.isArray(children) ? children : [children]
  const [childrenSizeArray, setChildrenSizeArray] = useState<Array<number>>([])

  const childrenRef = useRef<Array<HTMLDivElement>>([])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  const [pages, setPages] = useState<Array<Array<Node>>>([])
  const [currentPage, setCurrentPage] = useState(0)

  const windowSize = useWindowSize()

  // On the first render, save the children sizes to an array for calculations after resizing
  useEffect(() => {
    let newChildrenSizeArray: Array<number> = []

    childrenRef.current.forEach((ref) => {
      const refSize = orientation === 'horizontal' ? ref.scrollWidth : ref.scrollHeight
      newChildrenSizeArray.push(refSize)
    })

    setChildrenSizeArray(newChildrenSizeArray)
  }, [])

  // on window resize, split the children elements into pages differently
  useEffect(() => {
    splitIntoPages()
  }, [windowSize])

  const splitIntoPages = () => {
    // if content is not scrollable return
    if (
      wrapperRef.current === null ||
      childrenSizeArray.reduce((sizeSum, size) => sizeSum + size, 0) <
        (orientation === 'horizontal' ? wrapperRef.current.offsetWidth : wrapperRef.current.offsetHeight)
    ) {
      return
    }

    const childrenSizes = childrenSizeArray
    const selectorIsHorizontal = selectorLocation.startsWith('bottom') || selectorLocation.startsWith('top')
    const selectorIsTakingUpSpace =
      (orientation === 'horizontal' && !selectorIsHorizontal) || (orientation === 'vertical' && selectorIsHorizontal)
    // Calculating parent size (selector might be taking part of the size if it is of the opposite orientation, we
    // should then subtract its size (3.5rem = 56px)
    const parentSize =
      (orientation === 'horizontal' ? wrapperRef.current.offsetWidth : wrapperRef.current.offsetHeight) -
      (selectorIsTakingUpSpace ? 56 : 0)

    let newPagesArray: Array<Array<Node>> = []
    let currentPageSize: number = 0
    let currentPageElements: Array<Node> = []

    childrenRef.current.forEach((ref, i) => {
      const refSize = childrenSizes[i]

      // if the current page would overflow after adding this element, push it to the array and start a new page
      if (currentPageSize + refSize > parentSize && currentPageElements.length > 0) {
        newPagesArray.push(currentPageElements)
        currentPageSize = 0
        currentPageElements = []
      }

      // if there is one dom element that is too long and would be scrollable, split it into separate pages
      if (currentPageSize === 0 && refSize > parentSize) {
        // split into pages and save where to scroll on changing page
        let i = 0
        while ((i + 1) * parentSize < refSize) {
          let pageDom = ref.cloneNode(true) as HTMLDivElement

          pageDom.setAttribute('scrollTo', String(i * parentSize))
          newPagesArray.push([pageDom])
          i++
        }

        // avoid having the last part of the element be very small, instead, make it the size of parent element
        let lastPageDom = ref.cloneNode(true) as HTMLDivElement
        lastPageDom.setAttribute('scrollTo', String(refSize - parentSize))
        newPagesArray.push([lastPageDom])
      } else if (currentPageSize + refSize <= parentSize) {
        // if even after adding this element the page is not overflowing, add it to current page
        currentPageElements.push(ref.cloneNode(true))
        currentPageSize += refSize
      }
    })
    // push leftover elements to last page if needed
    if (currentPageElements.length > 0) {
      newPagesArray.push(currentPageElements)
    }

    // If the screen was resized it might happen that there's now less pages when user was on the last page
    if (currentPage > newPagesArray.length - 1) setCurrentPage(newPagesArray.length - 1)

    setPages(newPagesArray)
  }

  useEffect(() => {
    if (pages.length > 0 && pageRef.current !== null) {
      // remove all elements of previous page
      while (pageRef.current.firstChild) {
        pageRef.current.removeChild(pageRef.current.firstChild)
      }

      // if there is only one element, and it has a scrollTo attribute, add that element and scroll it
      if (
        pages[currentPage].length == 1 &&
        (pages[currentPage][0] as HTMLDivElement).getAttribute('scrollTo') !== null
      ) {
        const pageDiv = pages[currentPage][0] as HTMLDivElement
        const scrollTo = pageDiv.getAttribute('scrollTo')

        pageRef.current.appendChild(pageDiv)

        pageRef.current.scrollTo({
          left: orientation === 'horizontal' ? Number(scrollTo) : 0,
          top: orientation === 'vertical' ? Number(scrollTo) : 0,
          behavior: 'smooth',
        })
      } else {
        // otherwise, just add all the current page elements
        pages[currentPage].forEach((el: Node) => {
          if (pageRef.current !== null) pageRef.current.appendChild(el)
        })
      }
    }
  }, [pages, currentPage, orientation])

  return (
    <div
      ref={wrapperRef}
      className={classnames('w-full h-full flex justify-between', {
        'flex-row': selectorLocation.startsWith('right'),
        'flex-col': selectorLocation.startsWith('bottom'),
        'flex-row-reverse': selectorLocation.startsWith('left'),
        'flex-col-reverse': selectorLocation.startsWith('top'),
      })}
    >
      {(pages.length == 0 || pages.length == 1) && (
        <div
          className={classnames('flex', {
            'flex-row': orientation === 'horizontal',
            'flex-col': orientation === 'vertical',
          })}
        >
          {childrenArray.map((child, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el !== null) childrenRef.current[i] = el as HTMLDivElement
              }}
            >
              {child}
            </div>
          ))}
        </div>
      )}
      {pages.length > 1 && (
        <div
          ref={pageRef}
          className={classnames('overflow-hidden flex', {
            'flex-row': orientation === 'horizontal',
            'flex-col': orientation === 'vertical',
            'h-[calc(100%-3.5rem)] w-full': selectorLocation.startsWith('bottom') || selectorLocation.startsWith('top'),
            'w-[calc(100%-3.5rem)] h-full': selectorLocation.startsWith('right') || selectorLocation.startsWith('left'),
          })}
        ></div>
      )}
      {pages.length > 1 && (
        <PageSelector
          onClickLeft={() => {
            setCurrentPage(currentPage - 1)
          }}
          onClickRight={() => {
            setCurrentPage(currentPage + 1)
          }}
          currentPage={currentPage}
          maxPages={pages.length}
          selectorLocation={selectorLocation}
        ></PageSelector>
      )}
    </div>
  )
}

interface Props {
  children: JSX.Element[] | JSX.Element
  orientation: 'vertical' | 'horizontal'
  selectorLocation:
    | 'bottom-full'
    | 'top-full'
    | 'right-full'
    | 'left-full'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'right-top'
    | 'right-bottom'
    | 'right-center'
    | 'left-top'
    | 'left-bottom'
    | 'left-center'
}

export default Paginator
