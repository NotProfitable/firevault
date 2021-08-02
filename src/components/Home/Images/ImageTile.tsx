import { FileDocumentMongo } from '../../../../utils/types';
import fire from '../../../../utils/firebase';

export default function ImageTile(props: { file: FileDocumentMongo }) {
  const dateAdded: string = new Date(props.file.timestamp).toLocaleString();
  const name: string = props.file.name;
  const link = `/${fire.auth().currentUser!.uid}${props.file._id}`;

  return (
    <figure className="m-2 w-72 md:w-96 md:flex transition duration-500 ease-in-out bg-gray-100 rounded-xl md:hover:shadow-lg m-4">
      {/*<div className="flex flex-col justify-center items-center ">*/}
      {/*  <img*/}
      {/*    className="object-contain h-16 w-full md:rounded-none rounded-full mx-auto"*/}
      {/*    alt="Logo"*/}
      {/*    src="/firevault.png"*/}
      {/*  />*/}
      {/*</div>*/}
      <div className="w-full p-1 w-3/4 text-left m-0 md:p-6  text-center md:text-left space-y-4 break-all flex flex-col justify-between">
        <blockquote>
          <p className="text-lg font-semibold">{name}</p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-cyan-600">{dateAdded}</div>
          <a className="text-gray-500" href={link}>
            Link
          </a>
        </figcaption>
      </div>
    </figure>
  );
}
