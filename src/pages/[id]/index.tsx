import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from '@material-ui/core';

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
      <div className="m-auto w-screen h-screen flex flex-col justify-between ">
        <iframe className="m-auto w-full h-full" src={`/api/getFile/${id}`} />
        <Button
          variant="contained"
          color="primary"
          href="/"
          startIcon={
            <img
              className="object-contain h-12 mr-3 m-0 md:rounded-none rounded-full mx-auto"
              alt="Logo"
              src="/firevault.png"
            />
          }
        >
          <p className="text-base">Go home</p>
        </Button>
      </div>
    </div>
  );
}
