import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import LeftSelector from '~/public/icons/selectors/selector-left.svg'
import RightSelector from '~/public/icons/selectors/selector-right.svg'
import LeftSelectorBlue from '~/public/icons/selectors/selector-left-blue.svg'
import RightSelectorBlue from '~/public/icons/selectors/selector-right-blue.svg'
import DownSelector from '~/public/icons/selectors/selector-down.svg'
import UpSelector from '~/public/icons/selectors/selector-up.svg'
import DownSelectorBlue from '~/public/icons/selectors/selector-down-blue.svg'
import UpSelectorBlue from '~/public/icons/selectors/selector-up-blue.svg'
import Dot from '~/public/icons/selectors/dot.svg'
import DotSelected from '~/public/icons/selectors/dot-selected.svg'
import DotSelectedVertical from '~/public/icons/selectors/dot-selected-vert.svg'

const PageSelector = ({ currentPage, maxPages, onClickLeft, onClickRight, selectorLocation }: Props) => {
  const dotsVertRef = useRef<HTMLDivElement>(null)
  const dotsHorRef = useRef<HTMLDivElement>(null)

  const isHorizontal = selectorLocation.startsWith('bottom') || selectorLocation.startsWith('top')

  const dot = (i: number) => {
    if (i === currentPage) {
      if (isHorizontal) return <DotSelected></DotSelected>
      return <DotSelectedVertical></DotSelectedVertical>
    } else {
      return <Dot></Dot>
    }
  }

  useEffect(() => {
    // If the dots don't all fit and overflow, make sure the selected page dot is visible
    const scrollRef = isHorizontal ? dotsHorRef.current : dotsVertRef.current
    if (scrollRef === null) return
    scrollRef.scroll({
      behavior: 'smooth',
      top: isHorizontal ? 0 : currentPage * (scrollRef.scrollHeight / maxPages) - scrollRef.offsetHeight / 2 + 4,
      left: isHorizontal ? currentPage * (scrollRef.scrollWidth / maxPages) - scrollRef.offsetWidth / 2 + 4 : 0,
    })
  }, [currentPage, maxPages, isHorizontal])

  return (
    <div
      className={classnames('flex items-center select-none', {
        'h-[42px] w-full flex-row': isHorizontal,
        'w-[42px] h-full flex-col': !isHorizontal,
        'justify-between': selectorLocation.endsWith('full'),
        'justify-end': selectorLocation.endsWith('right') || selectorLocation.endsWith('bottom'),
        'justify-start': selectorLocation.endsWith('left') || selectorLocation.endsWith('top'),
        'space-x-[16px] ': !selectorLocation.endsWith('full') && isHorizontal,
        'space-y-[16px] ': !selectorLocation.endsWith('full') && !isHorizontal,
      })}
    >
      <div
        onClick={(e) => {
          e.preventDefault()
          if (currentPage > 0) onClickLeft()
        }}
        className={'w-[42px] h-[42px]'}
      >
        {(isHorizontal && ((currentPage > 0 && <LeftSelectorBlue />) || <LeftSelector />)) ||
          (currentPage > 0 && <UpSelectorBlue />) || <UpSelector />}
      </div>
      <div
        ref={dotsVertRef}
        className={classnames('flex justify-center overflow-hidden', {
          'w-[calc(100%-116px)]': isHorizontal && selectorLocation.endsWith('full'),
          'h-[calc(100%-116px)] items-center': !isHorizontal && selectorLocation.endsWith('full'),
          'h-max items-center': !isHorizontal && !selectorLocation.endsWith('full'),
          'w-max items-center': isHorizontal && !selectorLocation.endsWith('full'),
        })}
      >
        {(isHorizontal && (
          <div ref={dotsHorRef} className={'flex overflow-hidden w-max flex-row justify-left space-x-[9px]'}>
            {[...Array(maxPages)].map((e, i) => (
              <span key={i}>{dot(i)}</span>
            ))}
          </div>
        )) || (
          <div className={'m-auto'}>
            <div className={'flex overflow-hidden h-max flex-col items-start space-y-[9px]'}>
              {[...Array(maxPages)].map((e, i) => (
                <span key={i}>{dot(i)}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        onClick={(e) => {
          e.preventDefault()
          if (currentPage < maxPages - 1) onClickRight()
        }}
        className={'w-42 text-victron-gray dark:text-victron-gray-dark'}
      >
        {(isHorizontal && ((currentPage < maxPages - 1 && <RightSelectorBlue />) || <RightSelector />)) ||
          (currentPage < maxPages - 1 && <DownSelectorBlue />) || <DownSelector />}
      </div>
    </div>
  )
}

interface Props {
  currentPage: number
  maxPages: number
  onClickLeft: () => void
  onClickRight: () => void
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

export default PageSelector
