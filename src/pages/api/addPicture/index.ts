import nc from 'next-connect';
import multer from 'multer';
import uuid4 from 'uuid4';
import { storage } from '../../../../lib/firebase-admin';

const stream = require(`stream`);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
const apiRoute = nc({
  onError(error, req: any, res: any) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single(`image`));

apiRoute.post(async (req, res, next) => {
  console.log(req.file.name);
  const dataStream = new stream.PassThrough()
  const file = storage.bucket().file(uuid4() + req.file.mimeType.substring(req.file.name.lastIndexOf(`.`)));

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
        console.log(`fuck`)
        reject(error)
      })
      .on('finish', () => {
        resolve(true)
      })
  })

});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
