import React, { useMemo } from "react"
import Footer from "../Footer"
import Header from "../Header"
import { observer } from "mobx-react"
import { useAppViewsStore } from "../../../modules/AppViews"
import { PageSelectorProps } from "../PageSelector"

const MainLayout = ({ children, title, pageSelectorProps }: Props) => {
  const appViewsStore = useAppViewsStore()

  const getTitle = useMemo(() => {
    return title || appViewsStore.getViewTitle()
  }, [title, appViewsStore])

  return (
    <div className={"dark:bg-black dark:text-white text-black bg-white flex flex-col w-full h-full pt-2 px-2"}>
      <div className={"flex flex-row w-full h-full grow-0 basis-0 min-h-fit"}>
        <Header title={getTitle} />
      </div>
      <div className={"flex flex-col grow w-full h-full min-h-0"}>{children}</div>
      <div className={"flex flex-row w-full h-full grow-0 basis-0 min-h-fit"}>
        <Footer pageSelectorProps={pageSelectorProps} />
      </div>
    </div>
  )
}

interface Props {
  children?: JSX.Element
  title?: string
  pageSelectorProps?: PageSelectorProps
}

export default observer(MainLayout)
