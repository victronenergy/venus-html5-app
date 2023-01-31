import React, { useEffect, useMemo, useRef } from 'react'
import classnames from 'classnames'
import LeftSelectorIcon from '~/public/icons/selectors/selector-left.svg'
import RightSelectorIcon from '~/public/icons/selectors/selector-right.svg'
import LeftSelectorBlueIcon from '~/public/icons/selectors/selector-left-blue.svg'
import RightSelectorBlueIcon from '~/public/icons/selectors/selector-right-blue.svg'
import DownSelectorIcon from '~/public/icons/selectors/selector-down.svg'
import UpSelectorIcon from '~/public/icons/selectors/selector-up.svg'
import DownSelectorBlueIcon from '~/public/icons/selectors/selector-down-blue.svg'
import UpSelectorBlueIcon from '~/public/icons/selectors/selector-up-blue.svg'
import DotIcon from '~/public/icons/selectors/dot.svg'
import DotSelectedIcon from '~/public/icons/selectors/dot-selected.svg'
import DotSelectedVerticalIcon from '~/public/icons/selectors/dot-selected-vert.svg'

const PageSelector = ({ currentPage, maxPages, onClickLeft, onClickRight, selectorLocation }: Props) => {
  const dotsVertRef = useRef<HTMLDivElement>(null)
  const dotsHorRef = useRef<HTMLDivElement>(null)

  const isHorizontal = useMemo(
    () => selectorLocation.startsWith('bottom') || selectorLocation.startsWith('top'),
    [selectorLocation]
  )

  const dot = (i: number) => {
    if (i === currentPage) {
      if (isHorizontal) return <DotSelectedIcon></DotSelectedIcon>
      return <DotSelectedVerticalIcon></DotSelectedVerticalIcon>
    } else {
      return <DotIcon></DotIcon>
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
        'h-11 w-full flex-row': isHorizontal,
        'w-11 h-full flex-col': !isHorizontal,
        'justify-between': selectorLocation.endsWith('full'),
        'justify-end': selectorLocation.endsWith('right') || selectorLocation.endsWith('bottom'),
        'justify-start': selectorLocation.endsWith('left') || selectorLocation.endsWith('top'),
        'space-x-4 ': !selectorLocation.endsWith('full') && isHorizontal,
        'space-y-4 ': !selectorLocation.endsWith('full') && !isHorizontal,
      })}
    >
      <div
        onClick={(e) => {
          e.preventDefault()
          if (currentPage > 0) onClickLeft()
        }}
        className={'w-11 h-11'}
      >
        {(isHorizontal && ((currentPage > 0 && <LeftSelectorBlueIcon />) || <LeftSelectorIcon />)) ||
          (currentPage > 0 && <UpSelectorBlueIcon />) || <UpSelectorIcon />}
      </div>
      <div
        ref={dotsVertRef}
        className={classnames('flex justify-center overflow-hidden', {
          'w-[calc(100%-7.25rem)]': isHorizontal && selectorLocation.endsWith('full'),
          'h-[calc(100%-7.25rem)] items-center': !isHorizontal && selectorLocation.endsWith('full'),
          'h-max items-center': !isHorizontal && !selectorLocation.endsWith('full'),
          'w-max items-center': isHorizontal && !selectorLocation.endsWith('full'),
        })}
      >
        {(isHorizontal && (
          <div ref={dotsHorRef} className={'flex overflow-hidden w-max flex-row justify-left space-x-2'}>
            {[...Array(maxPages)].map((e, i) => (
              <span key={i}>{dot(i)}</span>
            ))}
          </div>
        )) || (
          <div className={'m-auto'}>
            <div className={'flex overflow-hidden h-max flex-col items-start space-y-2'}>
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
        {(isHorizontal && ((currentPage < maxPages - 1 && <RightSelectorBlueIcon />) || <RightSelectorIcon />)) ||
          (currentPage < maxPages - 1 && <DownSelectorBlueIcon />) || <DownSelectorIcon />}
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
