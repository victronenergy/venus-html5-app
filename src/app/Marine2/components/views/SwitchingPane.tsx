import React, { useState } from "react"
import { observer } from "mobx-react"
import MainLayout from "../ui/MainLayout"
import { translate } from "react-i18nify"
import Paginator from "../ui/Paginator"
import GridPaginator from "../ui/GridPaginator"
import { PageSelectorProps } from "../ui/PageSelector"
import Box from "../ui/Box"

const SwitchingPane = () => {
  const [pageSelectorProps, setPageSelectorProps] = useState<PageSelectorProps>()
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
          <Box title="Group 1">
            <div />
          </Box>
          <Box title="Group 2">
            <div />
          </Box>
          <Box title="Group 3">
            <div />
          </Box>
          <Box title="Group 4">
            <div />
          </Box>
          <Box title="Group 5">
            <div />
          </Box>
          <Box title="Group 6">
            <div />
          </Box>
          <Box title="Group 7">
            <div />
          </Box>
          <Box title="Group 8">
            <div />
          </Box>
          <Box title="Group 9">
            <div />
          </Box>
        </GridPaginator>
      </div>
    </MainLayout>
  )
}

export default observer(SwitchingPane)
