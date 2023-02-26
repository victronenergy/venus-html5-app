import React, { useEffect, useRef, useState } from "react"
import TanksIcon from "../../../images/icons/tanks.svg"
import { useTanks } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"
import { useComponentSize, useWindowSize } from "../../../utils/hooks"
import Box from "../../ui/Box"
import Tank from "./Tank"
import { AppViews } from "../../../modules/AppViews"
import { withErrorBoundary } from "react-error-boundary"
import { appErrorBoundaryProps } from "../../ui/Error/appErrorBoundary"
import { useVisibilityNotifier } from "../../../modules"
import { BoxTypes } from "../../../utils/constants"

interface Props {
  mode?: string
  className?: string
}

const Tanks = ({ mode, className }: Props) => {
  const { tanks } = useTanks()
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    if (!boxSize) return
    console.log("boxSize", boxSize)
  }, [boxSize])
  useVisibilityNotifier({ widgetName: BoxTypes.TANKS, visible: !!(tanks && tanks.length) })

  const gridRef = useRef<HTMLDivElement>(null)
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("vertical")

  const componentSize = useComponentSize(gridRef)
  const windowSize = useWindowSize()

  useEffect(() => {
    if (!windowSize || !componentSize) return
    if (windowSize.height !== undefined && 2 * componentSize.height > windowSize.height) {
      setOrientation("horizontal")
    } else {
      setOrientation("vertical")
    }
  }, [windowSize, componentSize])

  // todo: add component visibility report
  // if (!tanks || !tanks.length) return null

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
      >
        <div>
          {tanks?.map((tank) => {
            return tank ? <Tank mode={"compact"} key={tank} tankInstanceId={tank} parentSize={boxSize} /> : null
          })}
        </div>
      </Box>
    )
  }

  if (orientation === "vertical") {
    return (
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
      >
        <div ref={gridRef}>
          {tanks?.map((tank, index) => {
            return tank ? <Tank key={index} tankInstanceId={tank} mode="full" orientation={orientation} /> : <></>
          })}
        </div>
      </Box>
    )
  }

  return (
    <Box
      title={"Tanks"}
      icon={
        <TanksIcon
          /* todo: fix types for svg */
          /* @ts-ignore */
          className={"w-6 text-black dark:text-white"}
        />
      }
    >
      <div className="grid grid-cols-4 h-full">
        {tanks?.map((tank, index) => {
          return tank ? <Tank key={index} tankInstanceId={tank} mode="full" orientation={orientation} /> : <></>
        })}
      </div>
    </Box>
  )
}

export default withErrorBoundary(observer(Tanks), appErrorBoundaryProps)
