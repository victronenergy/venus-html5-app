import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import BackIcon from '~/public/icons/back.svg'

const Header = ({ title }: Props) => {
  const router = useRouter()
  const [isShowBack, setShowBack] = useState(false)

  const handleBackClick = () => {
    router.back()
  }

  useEffect(() => {
    setShowBack(router.asPath !== '/')
  }, [router.asPath])

  return (
    <div className={'flex flex-row justify-center'}>
      <div className={'text-center text-xl p-4'}>{title}</div>
      {isShowBack && (
        <div onClick={handleBackClick} className={'absolute right-4 top-4 cursor-pointer'}>
          <BackIcon className={'w-6 text-blue-600 dark:text-blue-400'} />
        </div>
      )}
    </div>
  )
}

interface Props {
  title?: string
}

export default observer(Header)
