import type { NextPage } from 'next'
import Head from 'next/head'
import Grid from '~/components/ui/Grid'
import Container from '~/components/ui/Container'

const AdaptiveGridExamplePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Victron Venus MFD Adaptove Grid example</title>
      </Head>

      <main className={'h-full dark:bg-black dark:text-white p-8'}>
        <div>
          <div>
            This is an example of using adaptive `Grid` component using this code:
            <div className={'bg-victron-darkGray dark:bg-victron-darkGray-dark rounded-md p-2 my-2'}>
              &lt;Grid className='gap-2' flow='col'&gt; <br />
              &nbsp;&nbsp;&lt;Container className='bg-amber-300 p-2'&gt;Box 1&lt;/Container&gt;
              <br />
              &nbsp;&nbsp;&lt;Container className='bg-blue-300 p-2'&gt;Box 2&lt;/Container&gt;
              <br />
              &nbsp;&nbsp;&lt;Container className='bg-green-300 p-2'&gt;Box 3&lt;/Container&gt;
              <br />
              &lt;/Grid&gt;
            </div>
            The grid is adaptive and will change the layout of columns based on the available space and width/height
            ratio.
          </div>
          <div className='my-4'>
            <div className='my-2'>3 components in a Grid, width no more than 3 times than height</div>
            <div className='w-full h-full w-[450px] h-[200px]'>
              <Grid className='gap-2' flow='col'>
                <Container className={'bg-amber-300 p-2'}>Box 1</Container>
                <Container className={'bg-blue-300 p-2'}>Box 2</Container>
                <Container className={'bg-green-300 p-2'}>Box 3</Container>
              </Grid>
            </div>
          </div>
          <div className='my-4'>
            <div className='my-2'>3 components in a Grid, width is more than 3 times than height</div>
            <div className='w-full h-full w-[800px] h-[200px]'>
              <Grid className='gap-2' flow='col'>
                <Container className={'bg-amber-300 p-2'}>Box 1</Container>
                <Container className={'bg-blue-300 p-2'}>Box 2</Container>
                <Container className={'bg-green-300 p-2'}>Box 3</Container>
              </Grid>
            </div>
          </div>
          <div className='my-4'>
            <div className='my-2'>3 components in a Grid, width is less than height</div>
            <div className='w-full h-full w-[200px] h-[500px]'>
              <Grid className='gap-2' flow='col'>
                <Container className={'bg-amber-300 p-2'}>Box 1</Container>
                <Container className={'bg-blue-300 p-2'}>Box 2</Container>
                <Container className={'bg-green-300 p-2'}>Box 3</Container>
              </Grid>
            </div>
          </div>
          <div className='mt-8 mb-32'>
            <div className='my-2 font-bold'>Try this resizable example</div>
            <div className='w-[700px] h-[400px] resize border-2 border-sky-500 p-4 overflow-auto'>
              <Grid className='gap-2'>
                <Container className={'bg-amber-300 p-2'}>Box 1</Container>
                <Container className={'bg-blue-300 p-2'}>Box 2</Container>
                <Container className={'bg-green-300 p-2'}>Box 3</Container>
                <Container className={'bg-fuchsia-300 p-2'}>Box 4</Container>
              </Grid>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdaptiveGridExamplePage
