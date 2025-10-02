import React, { useCallback, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react"
import SwitchableOutput from "../ui/SwitchableOutput"
import { useSwitchableOutputs } from "@victronenergy/mfd-modules"
import SmartswitchOffIcon from "../../images/icons/smartswitch_off.svg"
import SmartswitchOnIcon from "../../images/icons/smartswitch_on.svg"
import { Modal } from "../ui/Modal"
import classNames from "classnames"
import GroupPaginator from "../ui/GroupPaginator/GroupPaginator"
import Box from "../ui/Box"

const SwitchingPane = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const switchableOutputs = useSwitchableOutputs()

  const [groupNames, setGroupNames] = useState<string[]>([])
  const [groupsOfSwitchableOutputs, setGroupsOfSwitchableOutputs] = useState<React.JSX.Element[][]>([])

  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  const currentPageSetter = useCallback((a: number, b: number) => {
    setPageCount(b)
    setCurrentPage(a)
  }, [])

  useLayoutEffect(() => {
    const x = Object.entries(switchableOutputs.groups)
      // Sort groups by name
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([groupName, groupSwitchableOutputs]) => {
        // Return array of switchable outputs
        return {
          groupName: groupName,
          outputs: groupSwitchableOutputs.map((switchableOutput) => (
            <SwitchableOutput
              className="w-full pl-2 pr-2"
              key={`${switchableOutput.deviceId}_${switchableOutput.outputId}`}
              type={switchableOutput.type}
              deviceId={switchableOutput.deviceId}
              outputId={switchableOutput.outputId}
            />
          )),
        }
      })
    // array of groupNames by index
    setGroupNames(x.map((g) => g.groupName))
    // array of groups by index containing arrays of switchable outputs
    setGroupsOfSwitchableOutputs(x.map((g) => g.outputs))
  }, [switchableOutputs.groups])

  if (Object.keys(switchableOutputs.groups).length === 0) {
    return <></>
  }

  return (
    <div className="text-content-victronBlue cursor-pointer outline-none" onClick={() => setIsModalOpen(!isModalOpen)}>
      <div className="flex justify-center items-center w-full">
        {!isModalOpen ? (
          <div className="h-full">
            <SmartswitchOffIcon className="w-px-44 h-px-44 justify-center p-2" alt={"Swiching Pane"} />
          </div>
        ) : (
          <>
            <SmartswitchOnIcon
              className="w-px-44 h-px-44 justify-center p-2 opacity-1 z-20 text-content-victronBlue"
              onClick={() => setIsModalOpen(false)}
            />
          </>
        )}
        <Modal.Frame
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
          }}
          className={classNames("w-5/6 max-w-5/6 h-5/6 max-h-5/6")}
        >
          <Modal.Body variant="popUp" className="h-full bg-surface-primary">
            <GroupPaginator
              childrenGroups={groupsOfSwitchableOutputs}
              orientation="vertical"
              currentPageSetter={currentPageSetter}
            >
              {({
                columnChildren,
                groupIndex,
                groupColumnIndex,
                groupColumnCount,
                isFirstColumnOnPage,
                isFirstColumnOnLastPage,
              }) => {
                var displayPageTitle = false
                // NOTE: display page title for first page in every group
                if (groupColumnIndex === 0) {
                  displayPageTitle = true
                }
                // NOTE: display page title for first column displayed onscreen
                if (isFirstColumnOnPage) {
                  displayPageTitle = true
                }
                // NOTE: display page title for first column displayed onscreen
                // NOTE: when we are on the last page. (which can be non-first column
                // NOTE: when on the before-last page). Example for three columns:
                // groups: [a a a] [b b]
                // page 0: [a _ _]
                // page 1: [a] [b _]
                // last column `a` in the first group is also first column on the last page
                // and should not be displayed unless we are showing the last page
                if (isFirstColumnOnLastPage && currentPage === pageCount - 1) {
                  displayPageTitle = true
                }
                return (
                  <div
                    className={classNames("pt-2 pb-2 h-full", {
                      "pl-2": groupColumnIndex === 0,
                      "pr-2": groupColumnIndex === groupColumnCount - 1,
                    })}
                  >
                    <Box
                      title={displayPageTitle ? groupNames[groupIndex] : "\u00A0"}
                      roundLeftCorners={groupColumnIndex === 0}
                      roundRightCorners={groupColumnIndex === groupColumnCount - 1}
                    >
                      {columnChildren}
                    </Box>
                  </div>
                )
              }}
            </GroupPaginator>
          </Modal.Body>
        </Modal.Frame>
      </div>
    </div>
  )
}

export default observer(SwitchingPane)
