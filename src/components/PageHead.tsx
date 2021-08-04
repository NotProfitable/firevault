import Head from 'next/head';

export default function PageHead() {
  return (
    <Head>
      <title>Firevault</title>
      <meta name="title" content="Firevault" />
      <meta name="description" content="" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/firevault.svg" />
      <meta property="og:title" content="Firevault" key="title" />
      <meta property="og:description" content="" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@not_profitable" />

      <link rel='manifest' href='/manifest.json' />
      <link href='/icon-256x256.png' rel='icon' type='image/png' sizes='256x256' />
      <link href='/icon-384x384.png' rel='icon' type='image/png' sizes='384x384' />
      <link href='/icon-512x512.png' rel='icon' type='image/png' sizes='512x512' />

      <link rel='apple-touch-icon' href='/icon-192x192.png'></link>
      <meta name='theme-color' content='#2d3748' />
    </Head>
  );
}
