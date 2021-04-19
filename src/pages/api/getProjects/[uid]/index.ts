import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../../middlewares/database';
import 'firebase/auth';
import { withAuth } from '../../../../../middlewares/withAuth';
import { projectType } from '../../../../../utils/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		query: { uid },
	} = req;
	const { db } = await connectToDatabase();
	let projects: Array<projectType> = [];
	const response = await db
		.collection(uid as string)
		.find()
		.forEach((item) => {
			projects.push(item);
		});
	res.status(200).json({ projects });
};

export default withAuth(handler);
