import React, { useState } from "react"
import { observer } from "mobx-react"
import MainLayout from "../ui/MainLayout"
import { translate } from "react-i18nify"
import GridPaginator from "../ui/GridPaginator"
import { PageSelectorProps } from "../ui/PageSelector"
import SwitchableOutput from "../ui/SwitchableOutput"
import Box from "../ui/Box"
import { useSwitchableOutputs } from "@victronenergy/mfd-modules"

const SwitchingPane = () => {
  const [pageSelectorProps, setPageSelectorProps] = useState<PageSelectorProps>()
  const switchableOutputs = useSwitchableOutputs()

  return (
    <MainLayout title={translate("pages.switchingPane")} pageSelectorProps={pageSelectorProps}>
      <div className={"h-full w-full overflow-hidden"}>
        <GridPaginator
          perPage={4}
          flow="col"
          orientation="horizontal"
          childClassName="p-1"
          pageSelectorPropsSetter={setPageSelectorProps}
        >
          {Object.entries(switchableOutputs.groups)
            // Sort groups by name
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([groupName, groupSwitchableOutputs]) => (
              <Box key={groupName} title={groupName} withPagination={true} paginationOrientation={"vertical"}>
                {groupSwitchableOutputs.map((switchableOutput) => (
                  <SwitchableOutput
                    className="w-full"
                    key={`${switchableOutput.deviceId}_${switchableOutput.outputId}`}
                    type={switchableOutput.type}
                    deviceId={switchableOutput.deviceId}
                    outputId={switchableOutput.outputId}
                  />
                ))}
              </Box>
            ))}
        </GridPaginator>
      </div>
    </MainLayout>
  )
}

export default observer(SwitchingPane)
