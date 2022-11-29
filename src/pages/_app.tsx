import "~/styles/global.css"
import type { AppProps } from "next/app"
import { MuseoSans } from "~/fonts"

const MfdApp = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${MuseoSans.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}

export default MfdApp
