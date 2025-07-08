import React, { useState } from "react"
import { observer } from "mobx-react"
import MainLayout from "../ui/MainLayout"
import { translate } from "react-i18nify"
import GridPaginator from "../ui/GridPaginator"
import { PageSelectorProps } from "../ui/PageSelector"
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
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([groupName, groupSwitchableOutputs]) => (
              <Box key={groupName} title={groupName}>
                {groupSwitchableOutputs.map((switchableOutput) => (
                  <div key={switchableOutput.id}>
                    {switchableOutput.customName || switchableOutput.name}, type: {switchableOutput.type}
                  </div>
                ))}
              </Box>
            ))}
        </GridPaginator>
      </div>
    </MainLayout>
  )
}

export default observer(SwitchingPane)
