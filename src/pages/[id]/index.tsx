import { useRouter } from 'next/router';
import Head from 'next/head';

export default function FilePage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <></>;
  }

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Firevault Upload</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Firevault Upload" />
        <meta property="og:image" content={`/api/getFile/${id}`} />
      </Head>
      <iframe className="m-auto w-screen h-screen" src={`/api/getFile/${id}`} />
    </div>
  );
}
