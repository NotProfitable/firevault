import { runMiddleware } from '../../../../middlewares/runMiddleware';
import { cors } from '../../../../middlewares/cors';
import { getUID } from '../../../../middlewares/getUID';

const FileType = require(`file-type`);

const handler = async (req: any, res: any) => {
  await runMiddleware(req, res, cors);
  let a;
  try {
    a = await getUID(req.headers.authorization);
  } catch (e) {
    res.status(401).json({ error: `No auth` });
  }
  res.send(a);
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
