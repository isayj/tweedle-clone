import type { AppProps } from 'next/app'

import Layout from '@/components/Layout'
import '@/styles/globals.css'
import Modal from '@/components/Modal'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Modal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
