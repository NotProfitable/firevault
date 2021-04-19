import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import LandingAppBar, { uiConfig } from '@/components/LandingAppBar';
import fire from '../../../utils/firebase';
import styles from '../../styles/Home.module.css';

export default function NotSignedIn() {
	return (
		<div>
			<LandingAppBar />
			<div className={styles.main}>
				<h1>You are not signed in.</h1>
				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />
			</div>
		</div>
	);
}
