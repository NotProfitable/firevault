import nc from 'next-connect';
import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid4 } from 'uuid';
import { storage } from '../../../../lib/firebase-admin';
import { withSentry } from '@sentry/nextjs';
import Cors from 'cors'
const stream = require(`stream`);

const cors = Cors({
  methods: ['POST'],
})

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}


const handler = async (req: any, res: any) => {
  await runMiddleware(req, res, cors)
  await runMiddleware(req, res, upload.single(`file`))

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
}

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
