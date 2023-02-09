import React from "react"
import MainLayout from "../components/ui/MainLayout"
import Box from "../components/ui/Box"

const Root = () => {
  return (
    <MainLayout>
      <>
        <Box title={"Box"} onExpandHref={"/path1"} className={"my-1"}>
          Box content
        </Box>
        <Box title={"Box2"} onExpandHref={"/path1"} className={"my-1"}>
          Box2 content
        </Box>
      </>
    </MainLayout>
  )
}

export default Root
