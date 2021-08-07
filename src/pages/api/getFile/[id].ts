import { ObjectId } from 'bson';
import { runMiddleware } from '../../../../middlewares/runMiddleware';
import {
  connectToDatabase,
  connectToFileDatabase,
} from '../../../../middlewares/database';
import { cors } from '../../../../middlewares/cors';
import { FileDocumentMongo } from '../../../../utils/types';

const stream = require(`stream`);
const FileType = require(`file-type`);

const handler = async (req: any, res: any) => {
  await runMiddleware(req, res, cors);

  const {
    query: { id },
  } = req;

  if (id.length !== 52) res.send(`This file does not exist`);

  const uid = id.substring(0, 28);
  const fileMongoId = id.substring(28);

  const { dbFile } = await connectToFileDatabase();
  const response: FileDocumentMongo = await dbFile
    .collection(uid as string)
    .findOne({
      fileid: new ObjectId(fileMongoId),
    });
  if (response) {
    const ftype = await FileType.fromBuffer(response.buffer.buffer);
    if (ftype.mime) {
      res.setHeader(`Content-Type`, ftype.mime);
    }
    res.send(response.buffer.buffer);
  } else {
    res.send(`This file does not exist`);
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
