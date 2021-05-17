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
      <meta name="twitter:creator" content="@ashwin__" />
    </Head>
  );
}
