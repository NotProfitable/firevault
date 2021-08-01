import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import SignedInAppBar from '@/components/SignedInAppBar';
import ImageTile from '@/components/Home/Images/ImageTile';
import AccountImages from '@/components/Home/Images/AccountImages';
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

  useEffect(() => {
    fire
      .auth()
      .currentUser?.getIdToken(true)
      .then((idToken) => {
        fetch(`/api/getAccountImages`, {
          method: `GET`,
          headers: {
            Authorization: idToken,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            setLoading(false);
            setData(json);
            console.log(json);
          });
      });
  });
  const classes = useStyles();
  const photoURL = fire.auth()?.currentUser?.photoURL;
  const name = fire.auth().currentUser!.displayName;

  return (
    <div>
      <SignedInAppBar />
      <div className="flex flex-col justify-center items-center pt-20">
        <main className="flex flex-col justify-center flex-1 items-center p-5">
          <p>Welcome {name}. You are now signed-in!</p>
          <AccountImages loading={loading} data={data} />
        </main>
      </div>
    </div>
  );
}
