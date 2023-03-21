const DeviceCompact = ({ icon, title, subTitle, value, unit }: Props) => {
  return (
    <div className={"flex flex-row items-center justify-between w-full mb-2 md:mb-3 lg:mb-4 min-w-0"}>
      <div className={"shrink min-w-0 flex flex-row items-center justify-start"}>
        <div className={"shrink-0 w-11"}>{icon}</div>
        <div className={"shrink min-w-0 flex flex-col mr-2"}>
          <div
            className={
              "text-xs sm:text-sm md:text-base lg:text-base leading-none sm:leading-none md:leading-none lg:leading-none pb-1 truncate"
            }
          >
            {title}
          </div>
          <div
            className={
              "dark:text-victron-gray-dark text-xs md:text-sm lg:text-sm leading-[1.1rem] md:leading-none lg:leading-none truncate"
            }
          >
            {!!subTitle && subTitle}
          </div>
        </div>
      </div>
      <div className={"justify-self-end text-base md:text-lg lg:text-xl flex flex-row pr-2 w-max"}>
        <div>{value}</div>
        <div className={"text-victron-gray/70 pl-1"}>{unit}</div>
      </div>
    </div>
  )
}

interface Props {
  icon: JSX.Element
  title: string
  subTitle: string | false
  value: number | string | false | JSX.Element
  unit: string
}

export default DeviceCompact
