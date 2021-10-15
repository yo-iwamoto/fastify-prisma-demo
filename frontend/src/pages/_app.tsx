import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/tailwind.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Express Next</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
