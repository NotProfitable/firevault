import { CircularProgress } from '@material-ui/core';
import ImageTile from '@/components/Home/Images/ImageTile';
import { FileDocumentMongo } from '../../../../utils/types';

export default function AccountImages(props: {
  loading: any;
  data: Array<FileDocumentMongo>;
  reloadData: Function;
}) {
  return (
    <div className="flex align-middle justify-center flex-wrap max-w-screen-lg mt-3">
      {props.loading ? <CircularProgress /> : <></>}
      {props.data.length === 0 ? (
        <p className="text-gray-400 text-2xl">No files</p>
      ) : (
        <></>
      )}
      {props.data.map((item, index) => {
        // eslint-disable-next-line no-underscore-dangle
        return (
          <ImageTile reloadData={props.reloadData} file={item} key={item._id} />
        );
      })}
    </div>
  );
}
