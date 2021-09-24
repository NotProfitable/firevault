import { ObjectId } from 'bson';
import { rollbar } from '@/middlewares/rollbar';
import { runMiddleware } from '@/middlewares/runMiddleware';
import {
  connectToDatabase,
  connectToFileDatabase,
} from '@/middlewares/database';
import { cors } from '@/middlewares/cors';
import { FileDocumentMongo } from '@/utils/types';

const contentDisposition = require(`content-disposition`);
const stream = require(`stream`);
const FileType = require(`file-type`);
const zlib = require(`zlib`);
const handler = async (req: any, res: any) => {
  // res.writeHead(200, {
  //   'Content-Encoding': 'gzip',      // setting the encoding to gzip
  // });
  const gzip = zlib.createGzip();

  const interval = setInterval(() => {
    gzip.write(` `);
    gzip.flush();
  }, 1000);
  await runMiddleware(req, res, cors);

  const {
    query: { id },
  } = req;

  if (id.length !== 52) {
    res.send(`This file does not exist`);
    return;
  }

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
    try {
      res.setHeader(`Content-Type`, ftype.mime);
      res.send(response.buffer.buffer);
      setTimeout(() => {
        gzip.write(response.buffer.buffer);
        clearInterval(interval);
        gzip.end();
      }, 100);

      // Pipe the Gzip Transform Stream into the Response stream
      gzip.pipe(res);
    } catch (e) {
      rollbar.error(`mime error`);
      setTimeout(() => {
        gzip.write(response.buffer.toString());
        clearInterval(interval);
        gzip.end();
      }, 100);

      gzip.pipe(res);
    }
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
