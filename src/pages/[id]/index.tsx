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
    <div>
      <Head>
        <title>Firevault Upload</title>
      </Head>
      <div className="m-auto w-screen h-screen flex flex-col justify-between ">
        <iframe className="m-0 h-screen" src={`/api/getFile/${id}`} />
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
