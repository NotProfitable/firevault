import { runMiddleware } from '@/middlewares/runMiddleware';
import { cors } from '@/middlewares/cors';
import { getUID } from '@/middlewares/getUID';
import { FileDocumentMongo } from '@/utils/types';
import { connectToDatabase } from '@/middlewares/database';

const handler = async (req: any, res: any) => {
  await runMiddleware(req, res, cors);
  let a;
  try {
    a = await getUID(req.headers.authorization);
  } catch (e) {
    res.status(401).json({ error: `No auth` });
  }
  const { db } = await connectToDatabase();
  let files: Array<FileDocumentMongo> = [];
  const response = await db
    .collection(a as string)
    .find()
    .forEach((item) => {
      files.push(item);
    });
  res.status(200).json(files.reverse());
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
