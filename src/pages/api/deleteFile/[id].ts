import { ObjectId } from 'bson';
import { runMiddleware } from '../../../../middlewares/runMiddleware';
import {
  connectToDatabase,
  connectToFileDatabase
} from '../../../../middlewares/database';
import { cors } from '../../../../middlewares/cors';
import { FileDocumentMongo } from '../../../../utils/types';
import { getUID } from "../../../../middlewares/getUID";

const FileType = require(`file-type`);

const handler = async (req: any, res: any) => {
  await runMiddleware(req, res, cors);

  const {
    query: { id },
  } = req;

  let a = ``;
  try {
    a = await getUID(req.headers.authorization);
  } catch (e) {
    res.status(401).json({ error: `No auth` });
  }

  if (id.length !== 24)
    res.status(404).json({ error: `This file does not exist` });

  const uid = a;

  const { db } = await connectToDatabase();
  const { dbFile } = await connectToFileDatabase();
  const response = await db.collection(uid as string).deleteOne({
    _id: new ObjectId(id),
  });
  const responseFile = await dbFile.collection(uid as string).deleteOne({
    fileid: new ObjectId(id),
  });
  if (response.deletedCount === 1 && responseFile.deletedCount === 1) {
    res.status(200).json({ error: `Deleted` });
  } else {
    res.status(404).json({ error: `This file does not exist` });
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
