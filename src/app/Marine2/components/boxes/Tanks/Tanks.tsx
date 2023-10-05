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
import { BoxTypes } from "../../../utils/constants"
import ResizeObserver from "resize-observer-polyfill"
import useSize from "@react-hook/size"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import classNames from "classnames"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"

interface Props {
  componentMode?: ComponentMode
  className?: string
}

const Tanks = ({ componentMode = "full", className }: Props) => {
  const { tanks } = useTanks()
  const filteredTanks = (tanks || []).filter((tank) => !!tank || tank === 0)

  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [levelWidth, setLevelWidth] = useState(0)

  useVisibilityNotifier({ widgetName: BoxTypes.TANKS, visible: !!filteredTanks.length })

  const gridRef = useRef<HTMLDivElement>(null)
  const tankRef = useRef<HTMLDivElement>(null)
  const [orientation, setOrientation] = useState<ScreenOrientation>("vertical")

  const [width, height] = useSize(gridRef)
  const windowSize = useWindowSize()
  const activeStyles = applyStyles(boxSize, defaultBoxStyles)

  useEffect(() => {
    if (!windowSize.width || !windowSize.height) return

    if (windowSize.width > 3 * windowSize.height) {
      setOrientation("horizontal")
    } else {
      setOrientation("vertical")
    }
  }, [windowSize])

  useEffect(() => {
    if (!gridRef.current) return

    const observer = new ResizeObserver(getColumnsWidth)
    observer.observe(gridRef.current)
    return () => {
      observer.disconnect()
    }
  }, [gridRef])

  useEffect(() => {
    if (!tankRef.current) return

    const observer = new ResizeObserver(getColumnsWidth)
    observer.observe(tankRef.current)
    return () => {
      observer.disconnect()
    }
  }, [tankRef])

  // set the maximum width of the name and level of all the tanks
  const getColumnsWidth = () => {
    // wait for styles to be applied
    setTimeout(() => {
      const levels = document.querySelectorAll(".tank-level")
      let max = 0
      levels.forEach((level) => {
        if (level.clientWidth > max) {
          max = level.clientWidth
        }
      })

      if (max > 0) {
        setLevelWidth(max)
      }
    }, 0)
  }

  if (componentMode === "compact") {
    return (
      <Box
        title={translate("boxes.tanks")}
        /* todo: fix types for svg */
        /* @ts-ignore */
        icon={<TanksIcon className={classNames("text-black dark:text-white", activeStyles?.icon)} />}
        linkedView={AppViews.BOX_TANKS}
        className={className}
        getBoxSizeCallback={setBoxSize}
        withPagination={true}
        paginationOrientation={"vertical"}
      >
        {filteredTanks.map((tank) => (
          <div ref={tankRef} key={tank}>
            <Tank
              componentMode="compact"
              key={tank}
              tankInstanceId={Number(tank)}
              parentSize={boxSize}
              levelWidth={levelWidth}
            />
          </div>
        ))}
      </Box>
    )
  } else {
    if (orientation === "vertical") {
      return (
        <div className="w-full h-full p-2">
          <Box
            title={translate("boxes.tanks")}
            icon={
              <TanksIcon
                /* todo: fix types for svg */
                /* @ts-ignore */
                className={"w-6 text-black dark:text-white"}
              />
            }
            className={className}
            getBoxSizeCallback={setBoxSize}
            withPagination={true}
            paginationOrientation={"vertical"}
            setRef={gridRef}
          >
            {filteredTanks.map((tank, index) => {
              return (
                <Tank
                  key={index}
                  tankInstanceId={Number(tank)}
                  componentMode="full"
                  orientation={orientation}
                  parentSize={{ width, height }}
                  levelWidth={levelWidth}
                />
              )
            })}
          </Box>
        </div>
      )
    } else {
      // orientation === "horizontal"
      return (
        <div className="w-full h-full p-2">
          <Box
            title={"Tanks"}
            icon={
              <TanksIcon
                /* todo: fix types for svg */
                /* @ts-ignore */
                className={"w-6 text-black dark:text-white"}
              />
            }
            getBoxSizeCallback={setBoxSize}
            withPagination={true}
            paginationOrientation={"horizontal"}
          >
            <div className="flex h-full" ref={gridRef}>
              {filteredTanks.map((tank) => (
                <Tank
                  key={tank}
                  tankInstanceId={tank!}
                  componentMode="full"
                  orientation={orientation}
                  parentSize={{ width, height }}
                  levelWidth={levelWidth}
                />
              ))}
            </div>
          </Box>
        </div>
      )
    }
  }
}

export default observer(Tanks)
