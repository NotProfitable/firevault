import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { IconButton } from "@material-ui/core";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { makeStyles } from '@material-ui/core/styles';
import fire from '../../utils/firebase';
import {FileDocumentMongo} from "../../utils/types";

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

export default function SignedInAppBar(props: { reloadData: Function; }) {
  const classes = useStyles();
  const photoURL = fire.auth()?.currentUser?.photoURL;
  const name = fire.auth().currentUser!.displayName;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const signOut = () => {
    fire.auth().signOut();
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: `top`, horizontal: `right` }}
      keepMounted
      transformOrigin={{ vertical: `top`, horizontal: `right` }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={signOut}>Sign Out</MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar
          style={{
            display: `flex`,
            flexDirection: `row`,
            justifyContent: `space-between`,
          }}
        >
          <a href="/" className="flex flex-row text-center align-bottom">
            <img className="m-1 p-1 w-9 h-10" alt="Logo" src="/firevault.png" />
            <Typography variant="h6" className="flex flex-col justify-center">
              Firevault | Dashboard
            </Typography>
          </a>
          <div className="flex flex-row justify-center items-center h-full">
            <IconButton onClick={props.reloadData()}>
              <AutorenewIcon fontSize="large" className="text-white" />
            </IconButton>
            <Avatar onClick={handleProfileMenuOpen} src={photoURL as string} />
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
