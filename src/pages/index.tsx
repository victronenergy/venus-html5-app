import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Next.js Boilerplate | El Nino</title>
      </Head>

      <main>
        <div className={'text-center'}>
          <h1 className={'text-2xl mb-2'}>Victron Venus MFD</h1>
        </div>
      </main>
    </div>
  )
}

export default Home
