import { useEffect, useRef, useState } from "react"
import TanksIcon from "../../../images/icons/tanks.svg"
import { useTanks } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"
import { useWindowSize } from "../../../utils/hooks"
import Box from "../../ui/Box"
import Tank from "./Tank"
import { AppViews } from "../../../modules/AppViews"
import { useVisibilityNotifier } from "../../../modules"
import { BoxTypes } from "../../../utils/constants"
import ResizeObserver from "resize-observer-polyfill"
import useSize from "@react-hook/size"

interface Props {
  mode?: "full" | "compact"
  className?: string
}

const Tanks = ({ mode = "full", className }: Props) => {
  const { tanks } = useTanks()
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [levelWidth, setLevelWidth] = useState(0)

  useVisibilityNotifier({ widgetName: BoxTypes.TANKS, visible: !!(tanks && tanks.length) })

  const gridRef = useRef<HTMLDivElement>(null)
  const tankRef = useRef<HTMLDivElement>(null)
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("vertical")

  const [width, height] = useSize(gridRef)
  const windowSize = useWindowSize()

  useEffect(() => {
    if (!windowSize.width || !windowSize.height) return

    if (windowSize.width > 2 * windowSize.height) {
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

  if (mode === "compact") {
    return (
      <Box
        title={"Tanks"}
        /* todo: fix types for svg */
        /* @ts-ignore */
        icon={<TanksIcon className={"w-6 text-black dark:text-white"} />}
        linkedView={AppViews.BOX_TANKS}
        className={className}
        getBoxSizeCallback={setBoxSize}
        withPagination={true}
        paginationOrientation={"vertical"}
      >
        {tanks
          ?.filter((tank) => !!tank)
          .map((tank) => (
            <div ref={tankRef} key={tank}>
              <Tank
                mode={"compact"}
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
            title={"Tanks"}
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
            {tanks?.map((tank, index) => {
              return tank ? (
                <Tank
                  key={index}
                  tankInstanceId={tank}
                  mode="full"
                  orientation={orientation}
                  parentSize={{ width, height }}
                  levelWidth={levelWidth}
                />
              ) : (
                <></>
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
            <div className="flex justify-between h-full" ref={gridRef}>
              {tanks.map((tank) => (
                <Tank
                  key={tank}
                  tankInstanceId={tank!}
                  mode="full"
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
