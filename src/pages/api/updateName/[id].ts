import { ObjectId } from 'bson';
import { runMiddleware } from '@/middlewares/runMiddleware';
import { connectToDatabase } from '@/middlewares/database';
import { cors } from '@/middlewares/cors';
import { getUID } from '@/middlewares/getUID';

const FileType = require(`file-type`);

const handler = async (req: any, res: any) => {
  await runMiddleware(req, res, cors);

  const {
    query: {id},
  } = req;

  let a = ``;
  try {
    a = await getUID(req.headers.authorization);
  } catch (e) {
    res.status(401).json({error: `No auth`});
  }

  if (id.length !== 24) {
    res.status(404).json({error: `This file does not exist`});
  }

  const uid = a;
  const {db} = await connectToDatabase();
  const updateDoc = {
    $set: {
      name: req.body,
    },
  };
  const response = await db.collection(uid as string).updateOne(
    {
      _id: new ObjectId(id),
    },
    updateDoc,
  );
  if (response.matchedCount === 1) {
    res.status(200).json({});
  } else {
    res.status(404).json({error: `This file does not exist`});
  }
};

export default handler;

export const config = {
  api: {},
};
