import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import SignedInAppBar from '@/components/SignedInAppBar';
import AccountImages from '@/components/Home/Images/AccountImages';
import DropzoneArea from '@/components/Home/Images/Dropzone/Dropzone';
import PageHead from '@/components/PageHead';
import Loading from '@/components/Home/Loading';
import CachedIcon from '@material-ui/icons/Cached';
import Fab from '@material-ui/core/Fab';
import fire from '../../../utils/firebase';

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
              mounted = true;
            }
            setData(json);
          });
      });
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
    <div>
      <PageHead />
      {loading ? (
        <Loading />
      ) : (
        <>
          <SignedInAppBar />
          <div className="flex flex-col justify-center items-center pt-20">
            <main className="flex flex-col justify-center flex-1 items-center p-5 dark:text-blue-50">
              <p>Welcome {name}. You are now signed-in!</p>
              <DropzoneArea reloadData={loadData} />
              <AccountImages
                reloadData={loadData}
                loading={loading}
                data={data}
              />
            </main>
          </div>
        </>
      )}
    </div>
  );
}
