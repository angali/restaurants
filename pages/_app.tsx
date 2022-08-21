import { AppProps } from 'next/app'
import Head from 'next/head'
import '../public/static/css/styles.css'

const App = ({ Component, pageProps }: AppProps) => {
  const { seoPageTitle } = pageProps;

  return (
    <>
      <Head>
        <title>{seoPageTitle}</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App