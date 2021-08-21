import {useEffect, useState} from 'react';
import Loading from '@/components/Home/Loading';
import Landing from '@/components/Home/Landing';
import HomePage from '@/components/Home/Home';
import PageHead from '@/components/PageHead';
import UploadStick from '@/components/UploadStick';
import fire from '../utils/firebase';

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = fire.auth().onAuthStateChanged((user) => {
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
      return <Landing />;
    }
    return <HomePage />;
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
