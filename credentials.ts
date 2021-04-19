export const firebaseConfig = {
	apiKey: `AIzaSyBq-ARHky0nUIydO6FGZDuGqEfcH1cJCNY`,
	authDomain: `datapool-ddcee.firebaseapp.com`,
	projectId: `datapool-ddcee`,
	storageBucket: `datapool-ddcee.appspot.com`,
	messagingSenderId: `238076978715`,
	appId: `1:238076978715:web:fbf269ebde1e15d147babe`,
	measurementId: `G-KCQ5ZSW29W`,
};

export const mongoUsers = process.env.MONGO_USERS;

export const serviceAccount = {
	type: process.env.SERVICE_ACCOUNT_TYPE,
	project_id: process.env.SERVICE_ACCOUNT_PROJECT_ID,
	private_key_id: process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
	private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
	client_email: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
	client_id: process.env.SERVICE_ACCOUNT_CLIENT_ID,
	auth_uri: process.env.SERVICE_ACCOUNT_AUTH_URI,
	token_uri: process.env.SERVICE_ACCOUNT_TOKEN_URI,
	auth_provider_x509_cert_url: process.env.SERVICE_ACCOUNT_AUTH_PROVIDER,
	client_x509_cert_url: process.env.SERVICE_ACCOUNT_CLIENT_CERT,
};
