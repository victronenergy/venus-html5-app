import { observer } from "mobx-react"
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Victron Venus MFD</title>
      </Head>

      <main>
        <div className={'text-center'}>
          <h1 className={'text-2xl mb-2'}>Victron Venus MFD</h1>
        </div>
      </main>
    </div>
  )
}

export default observer(Home)
