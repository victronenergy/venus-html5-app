import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'
import Head from 'next/head'
import ThemeMode from '@components/theme/ThemeMode'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Victron Venus MFD</title>
      </Head>

      <main className={'safe-h-screen dark:bg-black'}>
        <div className={'text-center dark:text-white'}>
          <h1 className={'text-2xl mb-2'}>Victron Venus MFD</h1>
        </div>
        <div className={'absolute top-2 right-8'}>
          <ThemeMode />
        </div>
      </main>
    </div>
  )
}

export default observer(Home)
