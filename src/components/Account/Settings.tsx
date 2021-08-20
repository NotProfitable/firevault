import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import SettingsPageHead from '@/components/Account/SettingsPageHead';
import { Button } from '@material-ui/core';

export default function Settings() {
  const openDeleteDialog = () => {
    window.location.replace(`/secure/delete/`);
  };
  const openClearDialog = () => {
    window.location.replace(`/secure/clear/`);
  };

  const openDeleteAndClearDialog = () => {
    window.location.replace(`/secure/wipe/`);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <SettingsPageHead />
      <p className="text-xl m-6">Manage Your Account</p>
      <List className="w-80 sm:w-3/4 bg-gray-200 dark:bg-gray-500 rounded-md">
        <ListItem className="flex flex-col sm:flex-row justify-center items-center">
          <ListItemText
            primary="Delete Account"
            secondary="This will delete your user account but keep all of your uploaded files accessible on Firevault."
          />
          <ListItemAvatar>
            <Button
              onClick={openDeleteDialog}
              className="m-3"
              variant="contained"
              color="secondary"
            >
              Delete Account
            </Button>
          </ListItemAvatar>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem className="flex flex-col sm:flex-row justify-center items-center">
          <ListItemText
            className="text-white"
            primary="Clear Data"
            secondary="This will clear all of your existing files on Firevault."
          />
          <ListItemAvatar>
            <Button
              onClick={openClearDialog}
              className="m-3"
              variant="contained"
              color="secondary"
            >
              Clear Data
            </Button>
          </ListItemAvatar>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem className="flex flex-col sm:flex-row justify-center items-center">
          <ListItemText
            primary="Delete Account and Clear files"
            secondary="This will clear all of your files on Firevault and delete your user account."
          />
          <ListItemAvatar>
            <Button
              onClick={openDeleteAndClearDialog}
              className="m-3"
              variant="contained"
              color="secondary"
            >
              Delete and Clear
            </Button>
          </ListItemAvatar>
        </ListItem>
      </List>
    </div>
  );
}
