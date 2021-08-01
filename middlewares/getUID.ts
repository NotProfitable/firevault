import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../lib/firebase-admin';

export async function getUID(authHeader: string) {
  let uidDecoded;
  await auth.verifyIdToken(authHeader).then((decoded) => {
    const { uid } = decoded;
    uidDecoded = uid;
  });
  return uidDecoded;
}
