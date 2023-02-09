import React from "react"
import Footer from "../Footer"
import Header from "../Header"

const MainLayout = ({ children }: Props) => {
  return (
    <div className={"dark:bg-black dark:text-white flex flex-col w-full h-full p-4"}>
      <div className={"flex flex-row w-full h-full grow-0 basis-0"}>
        <Header title={"System overview"} />
      </div>
      <div className={"flex flex-col grow w-full h-full"}>{children}</div>
      <div className={"flex flex-row w-full h-full grow-0 basis-0"}>
        <Footer />
      </div>
    </div>
  )
}

interface Props {
  children?: JSX.Element
}

export default MainLayout
