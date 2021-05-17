import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import SignedInAppBar from '../../components/SignedInAppBar';
import ImageTile from '../../components/Home/Images/ImageTile';
import fire from '../../utils/firebase';
import styles from '../../styles/Home.module.css';

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
  const classes = useStyles();
  const photoURL = fire.auth()?.currentUser?.photoURL;
  const name = fire.auth().currentUser!.displayName;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openCreateDialog = () => {
    setDialogOpen(true);
  };
  const closeCreateDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <SignedInAppBar />
      <div className="flex flex-col justify-center items-center pt-20">
        <main className="flex flex-col justify-center flex-1 items-center p-5">
          <p>Welcome {name}. You are now signed-in!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 text-black">
            <ImageTile />
            <ImageTile />
            <ImageTile />
            <ImageTile />
          </div>
        </main>
      </div>
    </div>
  );
}
