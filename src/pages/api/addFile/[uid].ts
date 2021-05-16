import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid4 } from 'uuid';
import { storage } from '../../../../lib/firebase-admin';
const stream = require(`stream`);
import { runMiddleware } from '../../../../middlewares/runMiddleware'
import { connectToDatabase } from '../../../../middlewares/database';
import { withAuth } from '../../../../middlewares/withAuth';
import { rollbar } from '../../../../middlewares/rollbar';
import { cors } from '../../../../middlewares/cors';
const FileType = require('file-type');



const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1000 * 1024 * 1024,
  },
});

const handler = async (req: any, res: any) => {
  await runMiddleware(req, res, cors)
  await runMiddleware(req, res, upload.single(`file`))

  const {
    query: { uid },
  } = req;

  const { db } = await connectToDatabase();

  if(!req.file){
    rollbar.error("No File Uploaded");
    res.status(400).json({ status: "Error: No file attached" });
    return;
  }

  const dataStream = new stream.PassThrough()
  const fnuuid = uuid4();
  const ftype= await FileType.fromBuffer(req.file.buffer)
  console.log(ftype);
  const fn = fnuuid + `.` + ftype.ext;
  console.log(fn)
  const file = storage.bucket().file(fn);

  dataStream.push(req.file.buffer)
  dataStream.push(null)

  await new Promise((resolve, reject) => {
    dataStream.pipe(file.createWriteStream({
      resumable  : false,
      validation : false,
      contentType: req.file.mimeType,
      metadata   : {'Cache-Control': 'public, max-age=31536000'}
    }))
      .on('error', (error : Error) => {
         rollbar.error("Upload Error");
         res.status(500).json({ status: "Error", error });
       })
      .on('finish', async () => {
        rollbar.log("Image Uploaded");
        const response = await db.collection(uid as string).insertOne(
          {
            firebaseStorageFileId: fn,
            timestamp: new Date().toISOString(),
          },
          async (err, docsInserted) => {
            if(err){
               rollbar.error("Database Error");
               res.status(500).json({ status: "Error", err });
               return;
            }
            rollbar.log("Image Document Created");
            res.status(200).send("/" + uid + docsInserted.insertedId);
          },
        );
      })
  })
}

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
