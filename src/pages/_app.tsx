import "~/styles/global.css"
import type { AppProps } from "next/app"
import { Roboto } from "@next/font/google"

// TODO: Replace with font from design
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})
const MfdApp = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${roboto.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}

export default MfdApp
