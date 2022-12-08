import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'
import Head from 'next/head'
import Grid from '@components/ui/Grid'
import Box from '@components/ui/Box'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Victron Venus MFD</title>
      </Head>

      <main className={'safe-h-screen dark:bg-black'}>
        <div className={'flex grid grid-cols-2 w-full h-full gap-4'}>
          <div className={'flex flex-col w-full h-full'}>
            <div>4 boxes</div>
            <Grid>
              <Box className={'bg-amber-300'}>Box 1</Box>
              <Box className={'bg-blue-300'}>Box 2</Box>
              <Box className={'bg-green-300'}>Box 3</Box>
              <Box className={'bg-fuchsia-300'}>Box 4</Box>
            </Grid>
          </div>
          <div className={'flex flex-col w-full h-full'}>
            <div>3 boxes col</div>
            <Grid>
              <Box className={'bg-amber-300'}>Box 1</Box>
              <Box className={'bg-blue-300'}>Box 2</Box>
              <Box className={'bg-green-300'}>Box 3</Box>
            </Grid>
          </div>
          <div className={'flex flex-col w-full h-full'}>
            <div>3 boxes row</div>
            <Grid flow={'col'}>
              <Box className={'bg-amber-300'}>Box 1</Box>
              <Box className={'bg-blue-300'}>Box 2</Box>
              <Box className={'bg-green-300'}>Box 3</Box>
            </Grid>
          </div>
          <div className={'flex flex-col w-full h-full'}>
            <div>2 boxes row</div>
            <Grid>
              <Box className={'bg-amber-300'}>Box 1</Box>
              <Box className={'bg-blue-300'}>Box 2</Box>
            </Grid>
          </div>
          <div className={'flex flex-col w-full h-full'}>
            <div>2 boxes col</div>
            <Grid flow={'col'}>
              <Box className={'bg-amber-300'}>Box 1</Box>
              <Box className={'bg-blue-300'}>Box 2</Box>
            </Grid>
          </div>
          <div className={'flex flex-col w-full h-full'}>
            <div>1 box</div>
            <Grid>
              <Box className={'bg-amber-300'}>Box 1</Box>
            </Grid>
          </div>
        </div>
      </main>
    </div>
  )
}

export default observer(Home)
