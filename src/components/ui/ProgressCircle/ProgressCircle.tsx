import classNames from 'classnames'
import { colorForPercentageFormatter } from '~/utils/formatters'

const ProgressCircle = ({ percentage, size = 'large', children }: Props) => {
  const hasPercentage = percentage !== null
  const roundedPercentage = Math.round(percentage)
  const color = hasPercentage ? colorForPercentageFormatter(roundedPercentage) : 'victron-gray-4'
  const diameter = size === 'large' ? 144 : 90
  const stroke = size === 'large' ? 8 : 6
  const strokeClasses = classNames('fill-none', {
    'stroke-[6px]': stroke === 6,
    'stroke-[8px]': stroke === 8,
    'stroke-victron-green dark:stroke-victron-green-dark': color === 'victron-green',
    'stroke-victron-yellow dark:stroke-victron-yellow-dark': color === 'victron-yellow',
    'stroke-victron-red dark:stroke-victron-red-dark': color === 'victron-red',
    'stroke-victron-blue dark:stroke-victron-blue-dark': color === 'victron-blue',
    'stroke-victron-gray dark:stroke-victron-gray-4-dark': color === 'victron-gray-4',
  })

  return <div
    className={'relative flex justify-center items-center'}
    style={{ width: `${diameter}px`, height: `${diameter}px` }}
  >
    <svg
      className={'absolute w-full h-full -rotate-90'}
      viewBox={`0 0 ${diameter} ${diameter}`}
    >
      <circle
        r={`calc(50% - ${stroke / 2}px)`}
        cx={'50%'}
        cy={'50%'}
        className={classNames('opacity-30', strokeClasses)}
      />
      { roundedPercentage !== 0 &&
        <circle
          r={`calc(50% - ${stroke / 2}px)`}
          cx={'50%'}
          cy={'50%'}
          strokeDasharray={`${hasPercentage ? Math.floor(roundedPercentage / 5) : 20} 20`}
          strokeDashoffset={0}
          strokeLinecap={'round'}
          pathLength={20}
          className={strokeClasses}
          style={{ transition: 'stroke-dasharray .5s ease' }}
        />
      }
    </svg>
    <div className={'flex flex-col items-center'}>
      { hasPercentage &&
        <div className={size === 'large' ? 'text-3xl' : 'text-xl'}>
          { roundedPercentage }
          <span className={'text-victron-gray dark:text-victron-gray-dark'}>%</span>
        </div>
      }
      { children }
    </div>
  </div>
}

interface Props {
  percentage: number
  size?: 'small' | 'large'
  children?: JSX.Element
}

export default ProgressCircle