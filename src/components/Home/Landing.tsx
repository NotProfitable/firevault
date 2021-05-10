import LandingAppBar, { uiConfig } from '@/components/LandingAppBar';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import fire from '../../../utils/firebase';

export default function Landing() {
  return (
    <div>
      <LandingAppBar />
      <div className="flex flex-col items-center justify-center h-full text-center m-32">
        <div>
          <h1 className="text-4xl font-bold">Landing</h1>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />
        </div>
      </div>
    </div>
  );
}
