import React from 'react'
import classnames from 'classnames'

const ProgressBar = ({ percentage, type, orientation = 'horizontal' }: Props) => {
  const color = colorFortmatter(type)
  const bgColor = colorFortmatter(type, true)

  if (orientation === 'horizontal') {
    return (
      <div className='w-full flex p-5'>
        <div className={classnames(`w-1/4 h-2 rounded-l-2xl mr-2 ${bgColor}`)}>
          <div
            className={classnames(`h-full rounded-l-2xl ${color}`)}
            style={{ width: percentage >= 25 ? '100%' : `${percentage * 4}%` }}
          />
        </div>
        <div className={classnames(`w-1/4 h-2 mr-2 ${bgColor}`)}>
          <div
            className={classnames(`h-full ${color}`)}
            style={{ width: percentage >= 50 ? '100%' : percentage <= 25 ? '0%' : `${(percentage - 25) * 4}%` }}
          />
        </div>
        <div className={classnames(`w-1/4 color/30 h-2 mr-2 ${bgColor}`)}>
          <div
            className={classnames(`h-full ${color}`)}
            style={{ width: percentage >= 75 ? '100%' : percentage <= 50 ? '0%' : `${(percentage - 50) * 4}%` }}
          />
        </div>
        <div className={classnames(`w-1/4 color/30 h-2 rounded-r-2xl mr-2 ${bgColor}`)}>
          <div
            className={classnames(`h-full rounded-r-2xl ${color}`)}
            style={{ width: percentage <= 75 ? '0%' : `${(percentage - 75) * 4}%` }}
          />
        </div>
      </div>
    )
  } else {
    return (
      <div className='h-full w-full flex flex-col-reverse items-center'>
        <div className={classnames(`h-1/4 w-2 m-1 ${bgColor} rotate-180`)}>
          <div
            className={classnames(`w-full rounded-t-2xl ${color}`)}
            style={{ height: percentage >= 25 ? '100%' : `${percentage * 4}%` }}
          />
        </div>
        <div className={classnames(`h-1/4 w-2 m-1 ${bgColor} rotate-180`)}>
          <div
            className={classnames(`w-full ${color}`)}
            style={{ height: percentage >= 50 ? '100%' : percentage <= 25 ? '0%' : `${(percentage - 25) * 4}%` }}
          />
        </div>
        <div className={classnames(`h-1/4 w-2 m-1 ${bgColor} rotate-180`)}>
          <div
            className={classnames(`w-full ${color}`)}
            style={{ height: percentage >= 75 ? '100%' : percentage <= 50 ? '0%' : `${(percentage - 50) * 4}%` }}
          />
        </div>
        <div className={classnames(`h-1/4 w-2 m-1 rounded-b-2xl ${bgColor} rotate-180`)}>
          <div
            className={classnames(`w-full ${color}`)}
            style={{ height: percentage <= 75 ? '0%' : `${(percentage - 75) * 4}%` }}
          />
        </div>
      </div>
    )
  }
}

const colorFortmatter = function (type: number, opacity: boolean = false) {
  switch (type) {
    case 0:
      return !opacity ? 'bg-victron-lime' : 'bg-victron-lime/30'
    case 1:
      return !opacity ? 'bg-victron-cyan' : 'bg-victron-cyan/30'
    case 2:
      return !opacity ? 'bg-victron-slate' : 'bg-victron-slate/30'
    case 3:
      return !opacity ? 'bg-victron-green' : 'bg-victron-green/30'
    case 4:
      return !opacity ? 'bg-victron-lime' : 'bg-victron-lime/30'
    case 5:
      return !opacity ? 'bg-victron-purple' : 'bg-victron-purple/30'
    case 6:
      return !opacity ? 'bg-victron-lime' : 'bg-victron-lime/30'
    case 7:
      return !opacity ? 'bg-victron-lime' : 'bg-victron-lime/30'
    case 8:
      return !opacity ? 'bg-victron-lime' : 'bg-victron-lime/30'
    case 9:
      return !opacity ? 'bg-victron-lime' : 'bg-victron-lime/30'
    case 10:
      return !opacity ? 'bg-victron-green' : 'bg-victron-green/30'
    case 11:
      return !opacity ? 'bg-victron-slate' : 'bg-victron-slate/30'
  }
}

interface Props {
  percentage: number
  type: number
  orientation?: 'vertical' | 'horizontal'
}

export default ProgressBar
