import nc from 'next-connect';
import multer from 'multer';
import { v4 as uuid4 } from 'uuid';
import { storage } from '../../../../lib/firebase-admin';

const stream = require(`stream`);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
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

apiRoute.use(upload.single(`file`));

apiRoute.post(async (req, res, next) => {
  const dataStream = new stream.PassThrough()
  const fnuuid = uuid4();
  const fn = fnuuid + `.` + req.file.mimetype.substring(req.file.mimetype.indexOf(`/`) + 1);
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
      .on('finish', () => {
        res.status(200).json({ status: "Success" });
      })
  })
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
