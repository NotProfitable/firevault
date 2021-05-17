import { ObjectId } from 'bson';

export interface FileDocument {
  _id: string;
  firebaseStorageFileId: string;
  timestamp: Date;
}
