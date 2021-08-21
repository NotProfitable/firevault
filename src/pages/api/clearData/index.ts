import { ObjectId } from 'bson';
import { runMiddleware } from '../../../middlewares/runMiddleware';
import {
  connectToDatabase,
  connectToFileDatabase
} from '../../../middlewares/database';
import { cors } from '../../../middlewares/cors';
import { FileDocumentMongo } from '../../../utils/types';
import { getUID } from '@/middlewares/getUID';

const FileType = require(`file-type`);

const handler = async (req: any, res: any) => {
  await runMiddleware(req, res, cors);

  let uid = ``;
  try {
    uid = await getUID(req.headers.authorization);
  } catch (e) {
    res.status(401).json({ error: `No auth` });
  }

  const { db } = await connectToDatabase();
  const { dbFile } = await connectToFileDatabase();
  const response = await db.collection(uid as string).drop();
  const responseFile = await dbFile.collection(uid as string).drop();
  res.status(200).json({ status: `Deleted` });
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
