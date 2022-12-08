import { observer } from 'mobx-react-lite'
import { NextPageWithLayout } from '@pages/_app'
import CommonPageLayout from '@components/layout/CommonPageLayout'
import Box from '@components/ui/Box'
import Grid from '@components/ui/Grid'
import Energy from '@components/boxes/Energy'

const Home: NextPageWithLayout = () => {
  return (
    <div className={'p-4 h-full'}>
      <Grid className={'gap-2'}>
        <Energy />
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
