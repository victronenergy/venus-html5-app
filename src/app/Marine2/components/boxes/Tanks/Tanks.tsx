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
import Paginator from "../../ui/Paginator"

interface Props {
  mode?: "full" | "compact"
  className?: string
}

const Tanks = ({ mode = "full", className }: Props) => {
  const { tanks } = useTanks()
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

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
            <Tank mode={"compact"} key={tank} tankInstanceId={Number(tank)} parentSize={boxSize} />
          ))}
      </Box>
    )
  }

  // FIXME: this prop conflicts with mode === "full"
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
        getBoxSizeCallback={setBoxSize}
      >
        <div ref={gridRef}>
          {tanks?.map((tank, index) => {
            return tank ? (
              <Tank key={index} tankInstanceId={tank} mode="full" orientation={orientation} parentSize={boxSize} />
            ) : (
              <></>
            )
          })}
        </div>
      </Box>
    )
  }

  // FIXME: this is unreachable code in case of orientation === "vertical"
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
      getBoxSizeCallback={setBoxSize}
    >
      <Paginator selectorLocation="bottom-right" orientation="horizontal">
        <div className="flex justify-between h-full">
          {tanks.map((tank, index) => (
            <Tank key={index} tankInstanceId={tank!} mode="full" orientation={orientation} parentSize={boxSize} />
          ))}
        </div>
      </Paginator>
    </Box>
  )
}

export default withErrorBoundary(observer(Tanks), appErrorBoundaryProps)
