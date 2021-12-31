import LandingAppBar, { uiConfig } from '@/components/LandingAppBar';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import fire from '../../utils/firebase';

export default function Landing() {
  return (
    <div>
      <LandingAppBar />
      <div className="flex flex-col items-center justify-center h-screen text-center text-black dark:text-white">
        <div className="m-32 min-w-max">
          <img
            className="object-contain h-28 w-full md:rounded-none rounded-full mx-auto"
            alt="Logo"
            src="/firevault.png"
          />
          <h1 className="text-4xl font-bold">Firevault</h1>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} className="min-w-max" />
        </div>
      </div>
    </div>
  );
}
