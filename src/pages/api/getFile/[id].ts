import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid4 } from 'uuid';
import { storage } from '../../../../lib/firebase-admin';
const stream = require(`stream`);
import { runMiddleware } from '../../../../middlewares/runMiddleware';
import { connectToDatabase } from '../../../../middlewares/database';
import { withAuth } from '../../../../middlewares/withAuth';
import { rollbar } from '../../../../middlewares/rollbar';
import { cors } from '../../../../middlewares/cors';
import { ObjectId } from 'bson';
import { FileDocument } from '../../../../utils/types';

const handler = async (req: any, res: any) => {
  await runMiddleware(req, res, cors);

  const {
    query: { id },
  } = req;

  const options = {
    version: 'v2',
    action: 'read',
    expires: Date.now() + 1000 * 60,
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
      let fileUrl = await file
        .getSignedUrl({
          version: 'v2',
          action: 'read',
          expires: Date.now() + 1000 * 60,
        })
        .catch((err) => {
          console.log(err);
        });

        res.send(fileUrl)
    } else {
      res.status(404).json({});
    }
  } catch (err) {
    res.status(404).json({});
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
