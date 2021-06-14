import { ObjectId } from 'bson';

export interface FileDocument {
  _id: string;
  firebaseStorageFileId: string;
  timestamp: Date;
}

export interface FileDocumentMongo {
  _id: string;
  buffer: Buffer;
  firebaseStorageFileId: string;
  timestamp: Date;
}
