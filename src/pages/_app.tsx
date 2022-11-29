import '~/styles/global.css'
import { observer } from "mobx-react"
import type { AppProps } from 'next/app'

const MfdApp = ({ Component, pageProps }: AppProps) => {
  const ObserverComponent = observer(Component)

  return (
    <ObserverComponent {...pageProps} />
  )
}

export default MfdApp
