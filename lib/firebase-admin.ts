import * as admin from 'firebase-admin';

import { serviceAccount } from '../credentials';

if (!admin.apps.length) {
	admin.initializeApp({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		credential: admin.credential.cert(serviceAccount),
	});
}

const firestore = admin.firestore();
const auth = admin.auth();

export { firestore, auth };
