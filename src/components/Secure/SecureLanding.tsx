import LandingAppBar, { uiConfig } from '@/components/LandingAppBar';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import fire from '../../utils/firebase';

export default function Landing() {
  return (
    <div>
      <LandingAppBar />
      <div className="flex flex-col items-center justify-center h-screen text-center text-black dark:text-white">
        <div className="m-32 min-w-max">
          <h1 className="text-xl font-bold max-w-screen-sm break-words">
            Reauthenticate to perform this action.
          </h1>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={fire.auth()}
            className="min-w-max"
          />
        </div>
      </div>
    </div>
  );
}
