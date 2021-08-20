import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { IconButton } from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import fire from '../../../../utils/firebase';

export default function ClearAppBar() {
  const photoURL = fire.auth()?.currentUser?.photoURL;
  const name = fire.auth().currentUser!.displayName;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

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
              Firevault | Clear Files
            </Typography>
          </a>
          <div className="flex flex-row justify-center items-center h-full">
            <Avatar src={photoURL as string} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
