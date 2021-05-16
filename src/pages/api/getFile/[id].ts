import { ObjectId } from 'bson';
import { storage } from '../../../../lib/firebase-admin';
import { runMiddleware } from '../../../../middlewares/runMiddleware';
import { connectToDatabase } from '../../../../middlewares/database';
import { cors } from '../../../../middlewares/cors';
import { FileDocument } from '../../../../utils/types';

const stream = require(`stream`);

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

  console.log(uid, fileMongoId);

  const { db } = await connectToDatabase();
  let response: FileDocument;
  try {
    response = await db.collection(uid as string).findOne({
      _id: new ObjectId(fileMongoId),
    });
    if (response) {
      const file = storage.bucket().file(response.firebaseStorageFileId);
      let finalURL;
      const fileUrl: any = await file
        .getSignedUrl({
          version: `v2`,
          action: `read`,
          expires: Date.now() + 1000 * 60 * 10, // 5 min
        })
        .then((signedURLs) => {
          finalURL = signedURLs[0];
        })
        .catch((err) => {
          console.log(err);
        });

      res.redirect(finalURL);
    } else {
      res.send(`This file does not exist`).status(404);
    }
  } catch (err) {
    res.send(`This file does not exist`).status(404);
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
