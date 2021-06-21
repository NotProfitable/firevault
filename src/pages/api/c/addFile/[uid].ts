import multer from 'multer';
import { v4 as uuid4 } from 'uuid';
import { runMiddleware } from '../../../../../middlewares/runMiddleware';
import { connectToDatabase } from '../../../../../middlewares/database';
import { rollbar } from '../../../../../middlewares/rollbar';
import { cors } from '../../../../../middlewares/cors';

const { compress } = require(`iltorb`);
const stream = require(`stream`);
const FileType = require(`file-type`);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1000 * 1024 * 1024,
  },
});

const handler = async (req: any, res: any) => {
  await runMiddleware(req, res, cors);
  await runMiddleware(req, res, upload.single(`file`));

  const {
    query: { uid },
  } = req;

  const { db } = await connectToDatabase();

  if (!req.file) {
    rollbar.error(`No File Uploaded`);
    res.status(400).json({ status: `Error: No file attached` });
    return;
  }

  const dataStream = new stream.PassThrough();
  const fnuuid = uuid4();
  const ftype = await FileType.fromBuffer(req.file.buffer);
  const fn = `${fnuuid}.${ftype.ext}`;

  dataStream.push(req.file.buffer);
  dataStream.push(null);
  const response = db.collection(uid as string).insertOne(
    {
      firebaseStorageFileId: fn,
      buffer: await compress(req.file.buffer),
      timestamp: new Date().toISOString(),
    },
    async (err: any, docsInserted: { insertedId: any }) => {
      if (err) {
        rollbar.error(`Database Error`);
        res.status(500).json({ status: `Error`, err });
        return;
      }
      rollbar.log(`Image Document Created`);
      res.status(200).send(`/${uid}${docsInserted.insertedId}`);
    },
  );
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
