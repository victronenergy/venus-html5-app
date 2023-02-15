import React from "react"
import Footer from "../Footer"
import Header from "../Header"

const MainLayout = ({ children }: Props) => {
  return (
    <div className={"dark:bg-black dark:text-white text-black bg-white flex flex-col w-full h-full p-4"}>
      <div className={"flex flex-row w-full h-full grow-0 basis-0 min-h-fit"}>
        <Header title={"System overview 13"} />
      </div>
      <div className={"flex flex-col grow w-full h-full"}>{children}</div>
      <div className={"flex flex-row w-full h-full grow-0 basis-0 min-h-fit"}>
        <Footer />
      </div>
    </div>
  )
}

interface Props {
  children?: JSX.Element
}

export default MainLayout
