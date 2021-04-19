import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'bson';
import { connectToDatabase } from '../../../../../middlewares/database';
import { withAuth } from '../../../../../middlewares/withAuth';
import 'firebase/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		query: { uid },
		body: { id },
	} = req;
	const { db } = await connectToDatabase();
	let projectObj = {};
	let response;
	try {
		response = await db.collection(uid as string).findOne({
			_id: new ObjectId(JSON.parse(req.body).id),
		});
		projectObj = response;
		if (projectObj) {
			res.status(200).json(projectObj);
		} else {
			res.status(404).json({});
		}
	} catch (err) {
		res.status(404).json({});
	}
};

export default withAuth(handler);
