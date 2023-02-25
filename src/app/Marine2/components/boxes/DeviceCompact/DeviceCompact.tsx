const DeviceCompact = ({ icon, title, subTitle, value, unit }: Props) => {
  return (
    <div className={"flex flex-row items-center justify-between w-full mb-2"}>
      <div className={"flex flex-row items-center justify-start"}>
        <div className={"w-11"}>{icon}</div>
        <div className={"flex flex-col"}>
          <div className={"text-base leading-none md:leading-none lg:leading-none pb-1"}>{title}</div>
          <div className={"dark:text-victron-gray-dark text-sm leading-none md:leading-none lg:leading-none "}>
            {!!subTitle && subTitle}
          </div>
        </div>
      </div>
      <div className={"justify-self-end text-xl flex flex-row pr-2"}>
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
