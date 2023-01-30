import classNames from 'classnames'

const ProgressCircle = ({ percentage, children }: Props) => {
  const roundedPercentage = Math.round(percentage)
  const color = getColorForPercentage(roundedPercentage)
  return <div className={'w-36 h-36 relative flex justify-center items-center'}>
    <svg className={'absolute w-full h-full -rotate-90'} viewBox={'0 0 144 144'}>
      <circle
        r={'calc(50% - 4px)'}
        cx={'50%'}
        cy={'50%'}
        className={classNames('fill-none stroke-[8px] opacity-30', {
          'stroke-victron-green dark:stroke-victron-green-dark': color === 'victron-green',
          'stroke-victron-yellow dark:stroke-victron-yellow-dark': color === 'victron-yellow',
          'stroke-victron-red dark:stroke-victron-red-dark': color === 'victron-red',
        })}
      />
      <circle
        r={'calc(50% - 4px)'}
        cx={'50%'}
        cy={'50%'}
        strokeDasharray={`${roundedPercentage} 100`}
        strokeDashoffset={0}
        strokeLinecap={'round'}
        pathLength={100}
        className={classNames('fill-none stroke-[8px]', {
          'stroke-victron-green dark:stroke-victron-green-dark': color === 'victron-green',
          'stroke-victron-yellow dark:stroke-victron-yellow-dark': color === 'victron-yellow',
          'stroke-victron-red dark:stroke-victron-red-dark': color === 'victron-red',
        })}
      />
    </svg>
    <div className={'flex flex-col items-center'}>
      <div className={'text-3xl'}>
        { roundedPercentage }
        <span className={'text-victron-gray dark:text-victron-gray-dark'}>%</span>
      </div>
      { children }
    </div>
  </div>
}

const getColorForPercentage = function(percentage: number) {
  if (percentage <= 12) {
    return 'victron-red'
  } else if (percentage <= 40) {
    return 'victron-yellow'
  }
  return 'victron-green'
}

interface Props {
  percentage: number
  children?: JSX.Element
}

export default ProgressCircle