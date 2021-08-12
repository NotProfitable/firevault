import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import SignedInAppBar from '@/components/SignedInAppBar';
import AccountImages from '@/components/Home/Images/AccountImages';
import DropzoneArea from '@/components/Home/Images/Dropzone/Dropzone';
import PageHead from '@/components/PageHead';
import Loading from '@/components/Home/Loading';
import CachedIcon from '@material-ui/icons/Cached';
import Fab from '@material-ui/core/Fab';
import Footer from '@/components/Home/Footer';
import fire from '../../../utils/firebase';
import { FileDocumentMongo } from "../../../utils/types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  let mounted = false;
  const [totalData, setTotalData] = useState(0);

  const wakeUp = () => {
    fetch(`${process.env.NEXT_PUBLIC_UPLOAD_BASE}`, { method: `GET` });
  };
  const loadData = () => {
    fire
      .auth()
      .currentUser?.getIdToken(false)
      .then((idToken) => {
        fetch(`/api/getAccountImages`, {
          method: `GET`,
          headers: {
            Authorization: idToken,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            if (!mounted) {
              setLoading(false);
            }
            setData(json);
            mounted = true;
            let total = 0;
            json.map((index: FileDocumentMongo) => {
              total += index.size;
            });
            setTotalData(total);
          });
      });
  };

  const rmItem = (dataIndex: number) => {
    let t = data;
    t.splice(dataIndex, 1);
    setData(t);
  };

  useEffect(() => {
    if (!mounted) {
      wakeUp();
      loadData();
    }
  }, []);
  const classes = useStyles();
  const photoURL = fire.auth()?.currentUser?.photoURL;
  const name = fire.auth().currentUser!.displayName;

  return (
    <div className="flex flex-col justify-center text-center items-center">
      <PageHead />
      {loading ? (
        <Loading />
      ) : (
        <>
          <SignedInAppBar reloadData={loadData} />
          <div className="flex flex-col justify-center items-center pt-20">
            <main className="flex flex-col justify-center flex-1 items-center p-5 dark:text-blue-50">
              <p>Welcome {name}. You are now signed-in!</p>
              <DropzoneArea reloadData={loadData} />
              <AccountImages
                reloadData={loadData}
                deleteDataElement={rmItem}
                loading={loading}
                data={data}
              />
            </main>
            <Footer dataUsage={totalData} />
          </div>
        </>
      )}
    </div>
  );
}
