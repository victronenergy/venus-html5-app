import React from 'react'
import BasicPageLayout from '@components/layout/page/BasicPageLayout'

const CommonPageLayout = ({ title, children }: Props) => {
  return (
    <BasicPageLayout title={title}>
      <div className='safe-h-screen min-safe-h-screen flex flex-col'>
        <div>header</div>
        <div>{children}</div>
        <div>footer</div>
      </div>
    </BasicPageLayout>
  )
}

interface Props {
  title?: string
  children?: JSX.Element
}

export default CommonPageLayout
