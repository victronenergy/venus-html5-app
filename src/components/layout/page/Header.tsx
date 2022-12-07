import React from 'react'
import { observer } from 'mobx-react-lite'

const Header = ({ title }: Props) => {
  return <div className='text-center text-xl p-4'>{title}</div>
}

interface Props {
  title?: string
}

export default observer(Header)
