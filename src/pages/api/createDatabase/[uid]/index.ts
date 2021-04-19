import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../../middlewares/database';
import 'firebase/auth';
import { withAuth } from '../../../../../middlewares/withAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		query: { uid },
		body: { projectName, project },
	} = req;
	const { db } = await connectToDatabase();
	const response = await db.collection(uid as string).insertOne(
		{
			projectName: JSON.parse(req.body).projectName,
			databases: [],
			timestamp: new Date().toISOString(),
		},
		async (err, docsInserted) => {
			res.status(200).json({ status: 200, id: docsInserted.insertedId });
		},
	);
};

export default withAuth(handler);
