import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'
import Head from 'next/head'
import Grid from '~/components/ui/Grid'
import Container from '~/components/ui/Container'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Victron Venus MFD</title>
      </Head>

      <main className={'safe-h-screen dark:bg-black dark:text-white'}>
        <div className={'flex grid grid-cols-2 w-full h-full gap-4'}>
          <div className={'flex flex-col w-full h-full'}>
            <div>4 boxes</div>
            <Grid>
              <Container className={'bg-amber-300'}>Box 1</Container>
              <Container className={'bg-blue-300'}>Box 2</Container>
              <Container className={'bg-green-300'}>Box 3</Container>
              <Container className={'bg-fuchsia-300'}>Box 4</Container>
            </Grid>
          </div>
          <div className={'flex flex-col w-full h-full'}>
            <div>3 boxes col</div>
            <Grid>
              <Container className={'bg-amber-300'}>Box 1</Container>
              <Container className={'bg-blue-300'}>Box 2</Container>
              <Container className={'bg-green-300'}>Box 3</Container>
            </Grid>
          </div>
          <div className={'flex flex-col w-full h-full'}>
            <div>3 boxes row</div>
            <Grid flow={'col'}>
              <Container className={'bg-amber-300'}>Box 1</Container>
              <Container className={'bg-blue-300'}>Box 2</Container>
              <Container className={'bg-green-300'}>Box 3</Container>
            </Grid>
          </div>
          <div className={'flex flex-col w-full h-full'}>
            <div>2 boxes row</div>
            <Grid>
              <Container className={'bg-amber-300'}>Box 1</Container>
              <Container className={'bg-blue-300'}>Box 2</Container>
            </Grid>
          </div>
          <div className={'flex flex-col w-full h-full'}>
            <div>2 boxes col</div>
            <Grid flow={'col'}>
              <Container className={'bg-amber-300'}>Box 1</Container>
              <Container className={'bg-blue-300'}>Box 2</Container>
            </Grid>
          </div>
          <div className={'flex flex-col w-full h-full'}>
            <div>1 box</div>
            <Grid>
              <Container className={'bg-amber-300'}>Box 1</Container>
            </Grid>
          </div>
        </div>
      </main>
    </div>
  )
}

export default observer(Home)
