import React, {useState} from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import {FileDocumentMongo} from "../../../../../utils/types";
import fire from "../../../../../utils/firebase";
import {TextField} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: `absolute`,
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props: {
  file: FileDocumentMongo;
  reloadData: Function;
  deleteDataElement: Function;
  index: number;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dateAdded: string = new Date(props.file.timestamp).toLocaleString();
  const { name } = props.file;
  const link = `/${fire.auth().currentUser!.uid}${props.file._id}`;
  const rawLink = `/api/getFile/${fire.auth().currentUser!.uid}${
    props.file._id
  }`;
  const { size } = props.file;

  const [customName, setCustomName] = useState(``);
  const handleNameChange = (event: any) => {
    setCustomName(event.target.value);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          className="dark:bg-gray-700 dark:text-white"
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {props.file.name}
        </DialogTitle>
        <DialogContent dividers className="dark:bg-gray-700 dark:text-white">
          <Typography gutterBottom>
            <TextField
              className="w-full"
              variant="outlined"
              InputProps={{
                style: { backgroundColor: `white` },
              }}
              onFocusCapture={() => {
                setCustomName(name);
              }}
              placeholder="File Name (optional)"
              value={customName}
              onChange={handleNameChange}
            />
          </Typography>
          <Typography gutterBottom>
            <div className="text-cyan-600">{dateAdded}</div>
            <div className="text-cyan-600">{size} bytes</div>
          </Typography>
          <Typography gutterBottom>
            <div className="flex flex-row justify-center md:justify-start">
              <a href={link} className="text-blue-500 mr-3">
                Link
              </a>
              {`  -  `}
              <a href={rawLink} className="text-blue-500 ml-3">
                Raw File
              </a>
            </div>
          </Typography>
        </DialogContent>
        <DialogActions className="dark:bg-gray-700 dark:text-white">
          <Button
            startIcon={<DeleteIcon />}
            autoFocus
            onClick={handleClose}
            color="secondary"
            variant="contained"
          >
            Delete File
          </Button>
          <Button
            startIcon={<SaveIcon />}
            autoFocus
            onClick={handleClose}
            color="primary"
            variant="contained"
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
