import { useEffect, useState } from 'react';
import Loading from '@/components/Home/Loading';
import Landing from '@/components/Home/Landing';
import HomePage from '@/components/Home/Home';
import PageHead from '@/components/PageHead';
import fire from '../../utils/firebase';

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
    <div>
      <PageHead />
      {returnElement()}
    </div>
  );
}
