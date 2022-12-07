import { observer } from 'mobx-react-lite'
import { NextPageWithLayout } from '@pages/_app'
import CommonPageLayout from '@components/layout/page/CommonPageLayout'
import Box from '@components/layout/Box'
import Grid from '@components/layout/Grid'

const Home: NextPageWithLayout = () => {
  return (
    <div className={'p-4 h-full'}>
      <Grid>
        <Box className={'bg-amber-300 dark:bg-amber-700'}>Box 1</Box>
        <Box className={'bg-blue-300 dark:bg-blue-700'}>Box 2</Box>
        <Box className={'bg-green-300 dark:bg-green-700'}>Box 3</Box>
        <Box className={'bg-fuchsia-300 dark:bg-fuchsia-700'}>Box 4</Box>
      </Grid>
    </div>
  )
}

Home.getLayout = (page: JSX.Element) => {
  // TODO: add translations
  return <CommonPageLayout title='System Overview'>{page}</CommonPageLayout>
}

export default observer(Home)
