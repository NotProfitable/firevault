import { FileDocumentMongo } from '../../../../utils/types';
import fire from '../../../../utils/firebase';

export default function ImageTile(props: { file: FileDocumentMongo }) {
  const dateAdded: string = new Date(props.file.timestamp).toLocaleString();
  const name: string = props.file.name;
  const link = `/${fire.auth().currentUser!.uid}${props.file._id}`;
  const rawLink = `/api/getFile/${fire.auth().currentUser!.uid}${props.file._id}`;
  const size: number = props.file.size;

  return (
    <figure className="m-2 w-72 md:w-96 md:flex transition duration-500 ease-in-out bg-gray-200 dark:bg-gray-600 rounded-xl md:hover:shadow-lg m-4">
      <div className="w-full p-1 w-3/4 text-left m-0 md:p-6  text-center md:text-left space-y-4 break-all flex flex-col justify-between">
        <blockquote>
          <p className="text-lg font-semibold">{name}</p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-cyan-600">{dateAdded}</div>
          <div className="text-cyan-600">{size} bytes</div>
          <div className="flex flex-row justify-center md:justify-start">
            <a href={link} className="text-blue-500 mr-3">
              Link
            </a>
            {`  -  `}
            <a href={rawLink} className="text-blue-500 ml-3">
              Raw File
            </a>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
