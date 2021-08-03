import multer from 'multer';
import { v4 as uuid4 } from 'uuid';
import { runMiddleware } from '../../../../middlewares/runMiddleware';
import {
  connectToDatabase,
  connectToFileDatabase,
} from '../../../../middlewares/database';
import { rollbar } from '../../../../middlewares/rollbar';
import { cors } from '../../../../middlewares/cors';
import { getUID } from '../../../../middlewares/getUID';

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
  let a = ``;
  try {
    a = await getUID(req.headers.authorization);
  } catch (e) {
    res.status(401).json({ error: `No auth` });
  }

  const { db } = await connectToDatabase();
  const { dbFile } = await connectToFileDatabase();

  if (!req.file) {
    rollbar.error(`No File Uploaded`);
    res.status(400).json({ status: `Error: No file attached` });
    return;
  }

  const dataStream = new stream.PassThrough();
  const orName = req.file.originalname;
  dataStream.push(req.file.buffer);
  dataStream.push(null);
  let infoId;

  const response = await db.collection(a as string).insertOne(
    {
      timestamp: new Date().toISOString(),
      name: orName,
      size: req.file.size,
    },
    async (err: any, docsInserted: { insertedId: any }) => {
      if (err) {
        rollbar.error(`Database Error`);
        res.status(500).json({ status: `Error`, err });
        return;
      }
      rollbar.log(`Image Info Document Created`);
      infoId = docsInserted.insertedId;
      await dbFile.collection(a as string).insertOne(
        {
          fileid: infoId,
          buffer: req.file.buffer,
          name: orName,
        },
        // eslint-disable-next-line no-shadow
        async (err: any, docsInserted: { insertedId: any }) => {
          if (err) {
            rollbar.error(`Database Error`);
            res.status(500).json({ status: `Error`, err });
            return;
          }
          rollbar.log(`Image File Document Created`);
          res.status(200).json({ endpoint: `/${a}${docsInserted.insertedId}` });
        },
      );
    },
  );
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
