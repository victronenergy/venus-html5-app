import React from 'react'
import { observer } from 'mobx-react-lite'
import ThemeMode from '~/components/theme/ThemeMode'
import LogoIcon from '~/public/logo/logo.svg'
import Link from '~/components/ui/Link'
import { RouterPath } from '~/types/routes'

const Footer = () => {
  return (
    <div className='flex w-full flex-row justify-between p-4'>
      <div>
        <LogoIcon className={'w-32 text-black dark:text-white'} />
      </div>
      {/* TODO: add remote console and theme mode to menu */}
      <Link href={RouterPath.REMOTE_CONSOLE}>
        remote console
      </Link>
      <ThemeMode />
    </div>
  )
}

interface Props {}

export default observer(Footer)
