import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import Alert from '@/components/Alert';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FilePreviewer from 'react-file-previewer';
import { FileDocumentMongo } from '../../../utils/types';
import fire from '../../../utils/firebase';

const statusName = require(`http-status`);

export default function ImageTile(props: {
  file: FileDocumentMongo;
  reloadData: Function;
  deleteDataElement: Function;
  index: number;
}) {
  const dateAdded: string = new Date(props.file.timestamp).toLocaleString();
  const { name } = props.file;
  const link = `/${fire.auth().currentUser!.uid}${props.file._id}`;
  const rawLink = `/api/getFile/${fire.auth().currentUser!.uid}${
    props.file._id
  }`;
  const { size } = props.file;
  let uploadError = false;
  const [deleteStatus, setDeleteStatus] = useState(``);
  const [deleteStatusShown, setDeleteStatusShown] = useState(false);
  const openStatusSnackbar = () => {
    setDeleteStatusShown(true);
  };
  const closeStatusSnackbar = () => {
    setDeleteStatusShown(false);
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };

  const [customName, setCustomName] = useState(``);
  const handleNameChange = (event: any) => {
    setCustomName(event.target.value);
  };
  const [updateNameLoading, setUpdateNameLoading] = useState(false);
  const [updateNameSnackbar, setUpdateNameSnackbar] = useState(false);
  const closeUpdateNameSnackbar = () => {
    setUpdateNameSnackbar(false);
  };

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteSnackbar, setDeleteSnackbar] = useState(false);
  const closeDeleteSnackbar = () => {
    setDeleteSnackbar(false);
  };

  const updateName = () => {
    if (customName === ``) {
      return;
    }
    setUpdateNameLoading(true);
    fire
      .auth()
      .currentUser?.getIdToken(false)
      .then((idToken) => {
        fetch(`/api/updateName/${props.file._id}`, {
          method: `POST`,
          headers: {
            Authorization: idToken,
          },
          body: customName,
        })
          .then((res) => {
            if (res.status !== 200) {
              setUpdateNameLoading(false);
              setUpdateNameSnackbar(true);
            }
            return res.json();
          })
          .then((json) => {
            setUpdateNameLoading(false);
            props.reloadData();
          });
      });
  };

  const deleteFile = () => {
    setDeleteLoading(true);
    props.deleteDataElement(props.index);
    fire
      .auth()
      .currentUser?.getIdToken(false)
      .then((idToken) => {
        fetch(`/api/deleteFile/${props.file._id}`, {
          method: `POST`,
          headers: {
            Authorization: idToken,
          },
        })
          .then((res) => {
            if (res.status !== 200) {
              setDeleteLoading(false);
              setDeleteStatus(
                `${res.status} - ${statusName[`${res.status}_NAME`]}`,
              );
              openStatusSnackbar();
              uploadError = true;
            }
            return res.json();
          })
          .then((json) => {
            setDeleteLoading(false);
            if (!uploadError) {
              props.reloadData();
            }
          });
      });
  };

  return (
    <div className="w-72 md:w-96 md:flex transition duration-300 ease-in-out bg-gray-200 dark:bg-gray-600 rounded-md md:hover:shadow-xl m-4">
      <div className="w-full p-1 w-3/4 text-left m-0 md:p-6  text-center md:text-left space-y-4 break-all flex flex-col justify-between">
        <div className="w-full flex flex-row justify-center">
          <FilePreviewer
            style={{ width: `50px` }}
            file={{
              url: rawLink,
            }}
            hideControls
          />
        </div>
        <blockquote className="w-full flex flex-row items-start justify-between">
          <p className="text-lg font-semibold">{name}</p>
          <IconButton className="p-0 m-0" onClick={openDialog} component="span">
            <SettingsIcon className="text-black dark:text-white" />
          </IconButton>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-cyan-600">{dateAdded}</div>
          <div className="text-cyan-600">{size} bytes</div>
          <div className="flex flex-row justify-center md:justify-start">
            <a href={link} className="text-blue-500 mr-3">
              Link
            </a>
            {`  -  `}
            <a href={rawLink} className="text-blue-500 ml-3">
              Raw File
            </a>
          </div>
        </figcaption>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: `bottom`,
          horizontal: `left`,
        }}
        open={deleteStatusShown}
        autoHideDuration={5000}
        onClose={closeStatusSnackbar}
      >
        <Alert severity="error">{deleteStatus}.</Alert>
      </Snackbar>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle className="dark:bg-gray-700 dark:text-white w-auto break-all">
          <blockquote className="w-full flex flex-row items-start justify-between">
            {updateNameLoading ? <CircularProgress /> : props.file.name}
            <IconButton
              className="p-0 m-0"
              onClick={closeDialog}
              component="span"
            >
              <CloseIcon className="text-black dark:text-white" />
            </IconButton>
          </blockquote>
        </DialogTitle>
        <DialogContent dividers className="dark:bg-gray-700 dark:text-white">
          <Typography component="div" gutterBottom>
            <TextField
              className="w-full"
              variant="outlined"
              InputProps={{
                style: { backgroundColor: `white` },
              }}
              placeholder="Update file name"
              value={customName}
              onChange={handleNameChange}
            />
          </Typography>
          <Typography component="div" gutterBottom>
            <div className="text-cyan-600">{dateAdded}</div>
            <div className="text-cyan-600">{size} bytes</div>
          </Typography>
          <Typography component="div" gutterBottom>
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
        <div className="dark:bg-gray-700 dark:text-white flex flex-row justify-evenly p-2">
          <Button
            startIcon={<DeleteIcon />}
            onClick={() => {
              deleteFile();
            }}
            color="secondary"
            variant="contained"
            disabled={deleteLoading}
          >
            {deleteLoading ? <CircularProgress /> : `Delete File`}
          </Button>

          <Button
            startIcon={<SaveIcon />}
            onClick={() => {
              updateName();
            }}
            color="primary"
            variant="contained"
            disabled={updateNameLoading}
          >
            Save changes
          </Button>
        </div>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: `bottom`,
          horizontal: `left`,
        }}
        open={updateNameSnackbar}
        autoHideDuration={5000}
        onClose={closeUpdateNameSnackbar}
      >
        <Alert severity="error">Error: Could not update name.</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: `bottom`,
          horizontal: `left`,
        }}
        open={deleteSnackbar}
        autoHideDuration={5000}
        onClose={closeDeleteSnackbar}
      >
        <Alert severity="error">{deleteStatus}</Alert>
      </Snackbar>
    </div>
  );
}
