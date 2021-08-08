import { CircularProgress } from '@material-ui/core';
import ImageTile from '@/components/Home/Images/ImageTile';
import { FileDocumentMongo } from '../../../../utils/types';

export default function AccountImages(props: {
  loading: any;
  data: Array<FileDocumentMongo>;
  reloadData: Function;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {props.loading ? <CircularProgress /> : <></>}
      {props.data.map((item, index) => {
        // eslint-disable-next-line no-underscore-dangle
        return (
          <ImageTile reloadData={props.reloadData} file={item} key={item._id} />
        );
      })}
    </div>
  );
}
