import {ObjectId} from 'bson';
import {storage} from '../../../../lib/firebase-admin';
import {runMiddleware} from '../../../../middlewares/runMiddleware';
import {connectToDatabase} from '../../../../middlewares/database';
import {cors} from '../../../../middlewares/cors';
import {FileDocument} from '../../../../utils/types';

const stream = require(`stream`);
const FileType = require(`file-type`);

const handler = async (req: any, res: any) => {
  await runMiddleware(req, res, cors);

  const {
    query: { id },
  } = req;

  const options = {
    version: `v2`,
    action: `read`,
    expires: Date.now() + 1000 * 10,
  };

  const uid = id.substring(0, 28);
  const fileMongoId = id.substring(28);

  const { db } = await connectToDatabase();
  const response: FileDocument = await db.collection(uid as string).findOne({
    _id: new ObjectId(fileMongoId),
  });
  console.log(response);
  if (response) {
    const dataStream = new stream.PassThrough();
    const file = storage.bucket().file(response.firebaseStorageFileId);
    let fileContents = new Buffer(``);
    const fileStream = await file
      .createReadStream()
      .on(`data`, (chunk) => {
        fileContents = Buffer.concat([fileContents, chunk]);
      })
      .on(`end`, async () => {
        const ftype = await FileType.fromBuffer(fileContents);

        res.setHeader(`Content-Type`, ftype.mime);
        res.send(fileContents);
      });
    // res.redirect(finalURL);
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
