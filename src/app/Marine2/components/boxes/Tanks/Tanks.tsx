import { useEffect, useRef, useState } from "react"
import TanksIcon from "../../../images/icons/tanks.svg"
import { useTanks } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react"
import { useWindowSize } from "../../../utils/hooks/use-window-size"
import Box from "../../ui/Box"
import Tank from "./Tank/Tank"
import { AppViews } from "../../../modules/AppViews"
import { translate } from "react-i18nify"
import { useVisibilityNotifier } from "../../../modules"
import useSize from "@react-hook/size"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import classNames from "classnames"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"
import { BOX_TYPES } from "../../../utils/constants/generic"
import { ISize } from "@m2Types/generic/size"
import { sortTanks } from "../../../utils/helpers/devices/tanks/sort-tanks"

interface Props {
  componentMode?: ComponentMode
  className?: string
}

const Tanks = ({ componentMode = "full", className }: Props) => {
  const { tanks } = useTanks()

  const sortedTanks = sortTanks(tanks || [])

  const [boxSize, setBoxSize] = useState<ISize>({ width: 0, height: 0 })

  const hasValidData = !!tanks.length

  useVisibilityNotifier({ widgetName: BOX_TYPES.TANKS, isVisible: hasValidData })

  const gridRef = useRef<HTMLDivElement>(null)
  const [orientation, setOrientation] = useState<ScreenOrientation>("vertical")

  const [width, height] = useSize(gridRef)
  const windowSize = useWindowSize()
  const activeStyles = applyStyles(boxSize, defaultBoxStyles)

  useEffect(() => {
    if (!windowSize.width || !windowSize.height) return

    const orientation = windowSize.width > 3 * windowSize.height ? "horizontal" : "vertical"

    setOrientation(orientation)
  }, [windowSize])

  if (componentMode === "compact") {
    return (
      <Box
        title={translate("boxes.tanks")}
        icon={<TanksIcon className={classNames("text-content-victronGray", activeStyles?.icon)} />}
        linkedView={AppViews.BOX_TANKS}
        className={className}
        getBoxSizeCallback={setBoxSize}
        withPagination={true}
        paginationOrientation="vertical"
      >
        {sortedTanks.map((tank) => (
          <Tank key={tank.instance} tankInstanceId={tank.instance} componentMode="compact" parentSize={boxSize} />
        ))}
      </Box>
    )
  }

  if (orientation === "vertical") {
    return (
      <div className="w-full h-full p-2">
        <Box
          title={translate("boxes.tanks")}
          icon={<TanksIcon className="w-6 text-content-victronGray" />}
          className={className}
          getBoxSizeCallback={setBoxSize}
          withPagination={true}
          paginationOrientation="vertical"
        >
          {sortedTanks.map((tank) => (
            <Tank
              key={tank.instance}
              tankInstanceId={tank.instance}
              componentMode="full"
              orientation={orientation}
              parentSize={{ width, height }}
            />
          ))}
        </Box>
      </div>
    )
  }

  //orientation === "horizontal"
  return (
    <div className="w-full h-full p-2">
      <Box
        title={translate("boxes.tanks")}
        icon={<TanksIcon className={"w-6 text-content-victronGray"} />}
        getBoxSizeCallback={setBoxSize}
        withPagination={true}
        paginationOrientation="horizontal"
      >
        <div className="flex h-full" ref={gridRef}>
          {sortedTanks.map((tank) => (
            <Tank
              key={tank.instance}
              tankInstanceId={tank.instance}
              componentMode="full"
              orientation={orientation}
              parentSize={{ width, height }}
            />
          ))}
        </div>
      </Box>
    </div>
  )
}

export default observer(Tanks)
