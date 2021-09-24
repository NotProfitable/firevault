import { useEffect, useState } from 'react';
import Loading from '@/components/Home/Loading';
import SecureLanding from '@/components/Secure/SecureLanding';
import PageHead from '@/components/PageHead';
import UploadStick from '@/components/UploadStick';
import DeletePage from '@/components/Secure/Delete/DeletePage';
import fire from '@/utils/firebase';

export default function Delete() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signed, setSigned] = useState(false);
  let one = false;

  useEffect(() => {
    const unregisterAuthObserver = fire.auth().onAuthStateChanged((user) => {
      if (!one && fire.auth().currentUser) {
        fire.auth().signOut();
        one = true;
      }
      setIsSignedIn(!!user);
      setSigned(true);
    });
    return () => unregisterAuthObserver();
  }, []);

  const returnElement = () => {
    if (!isSignedIn && !signed) {
      return <Loading />;
    }
    if (!isSignedIn) {
      return <SecureLanding />;
    }
    return <DeletePage />;
  };

  return (
    <div className="h-full min-h-screen bg-white dark:bg-gray-800">
      <PageHead />
      {process.env.NEXT_PUBLIC_BASE_NAME === `HEROKU` ? (
        <UploadStick />
      ) : (
        returnElement()
      )}
    </div>
  );
}
