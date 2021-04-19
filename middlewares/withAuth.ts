import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../lib/firebase-admin';

export function withAuth(
	handler: (arg0: NextApiRequest, arg1: NextApiResponse<any>) => any,
) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).end(`Not authenticated. No Auth header`);
		}
		let decodedToken;
		try {
			decodedToken = await auth.verifyIdToken(authHeader);
			if (!decodedToken || !decodedToken.uid)
				return res.status(401).end(`Not authenticated`);
			// req.uid = decodedToken.uid;
		} catch (error) {
			console.log(error.errorInfo);
			const errorCode = error.errorInfo.code;
			error.status = 401;
			if (errorCode === `auth/internal-error`) {
				error.status = 500;
			}
			// TODO handle firebase admin errors in more detail
			return res.status(error.status).json({ error: errorCode });
		}

		return handler(req, res);
	};
}
