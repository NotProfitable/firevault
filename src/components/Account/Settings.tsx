import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import SettingsPageHead from '@/components/Account/SettingsPageHead';
import { Button } from "@material-ui/core";

export default function Settings() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <SettingsPageHead />
      <p className="text-xl m-6">Manage Your Account</p>
      <List className="w-80 sm:w-3/4 bg-gray-200 dark:bg-gray-500 rounded-md">
        <ListItem>
          <ListItemText primary="Delete Account" secondary="This will delete your user account but keep all of your uploaded files accessible on Firevault." />
          <ListItemAvatar>
            <Button className="m-3" variant="contained" color="secondary">
              Delete Account
            </Button>
          </ListItemAvatar>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem>
          <ListItemText className="text-white" primary="Clear Data" secondary="This will clear all of your existing files on Firevault." />
          <ListItemAvatar>
            <Button className="m-3" variant="contained" color="secondary">
              Clear Data
            </Button>
          </ListItemAvatar>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem>
          <ListItemText
            primary="Delete Account and Clear files"
            secondary="This will clear all of your files on Firevault and delete your user account."
          />
          <ListItemAvatar>
            <Button className="m-3" variant="contained" color="secondary">
              Delete and Clear
            </Button>
          </ListItemAvatar>
        </ListItem>
      </List>
    </div>
  );
}
