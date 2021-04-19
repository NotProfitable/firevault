import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from '../../credentials';

if (!firebase.apps.length) {
	try {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
	} catch (error) {
		console.log(`Firebase admin initialization error`, error.stack);
	}
}

export default firebase;
