import { observer } from 'mobx-react-lite'
import ThemeMode from '@components/theme/ThemeMode'
import { NextPageWithLayout } from '@pages/_app'
import CommonPageLayout from '@components/layout/page/CommonPageLayout'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className={'text-center dark:text-white'}>
        <h1 className={'text-2xl mb-2'}>Victron Venus MFD</h1>
      </div>
      <div className={'absolute top-2 right-8'}>
        <ThemeMode />
      </div>
    </>
  )
}

Home.getLayout = (page: JSX.Element) => {
  // TODO: add translations
  return <CommonPageLayout title='System Overview'>{page}</CommonPageLayout>
}

export default observer(Home)
