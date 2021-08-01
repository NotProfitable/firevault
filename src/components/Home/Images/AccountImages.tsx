import { CircularProgress } from '@material-ui/core';
import { FileDocumentMongo } from '../../../../utils/types';
import ImageTile from "@/components/Home/Images/ImageTile";

export default function AccountImages(props: {
  loading: any;
  data: Array<FileDocumentMongo>;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {props.loading ? <CircularProgress /> : <></>}
      {props.data.map((item, index) => {
        // eslint-disable-next-line no-underscore-dangle
        return <ImageTile file={item} key={item._id} />;
      })}
    </div>
  );
}
