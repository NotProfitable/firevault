import {
  Dialog,
  IconButton,
  Snackbar,
  Button,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  DialogActions
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import React, { useState } from 'react';
import Alert from '@/components/Alert';
import { FileDocumentMongo } from '../../../../../utils/types';
import fire from '../../../../../utils/firebase';

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
  const deleteFile = () => {
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
              setDeleteStatus(
                `${res.status} - ${statusName[`${res.status}_NAME`]}`,
              );
              openStatusSnackbar();
              uploadError = true;
            }
            return res.json();
          })
          .then((json) => {
            if (!uploadError) {
              props.reloadData();
            }
          });
      });
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
  const updateName = () => {
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
          .then((res) => res.json())
          .then((json) => {
            props.reloadData();
          });
      });
  };
  return (
    <div  className="w-72 md:w-96 md:flex transition duration-300 ease-in-out bg-gray-200 dark:bg-gray-600 rounded-md md:hover:shadow-xl m-4">
      <div className="w-full p-1 w-3/4 text-left m-0 md:p-6  text-center md:text-left space-y-4 break-all flex flex-col justify-between">
        <blockquote>
          <p className="text-lg font-semibold">{name}</p>
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
          {/*<IconButton*/}
          {/*  onClick={deleteFile}*/}
          {/*  color="secondary"*/}
          {/*  aria-label="upload picture"*/}
          {/*  component="span"*/}
          {/*>*/}
          {/*  <DeleteIcon />*/}
          {/*</IconButton>*/}
          <Button onClick={openDialog} variant="contained">Show Options</Button>
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
          {props.file.name}
        </DialogTitle>
        <DialogContent dividers className="dark:bg-gray-700 dark:text-white">
          <Typography component="div" gutterBottom>
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
        <DialogActions className="dark:bg-gray-700 dark:text-white flex flex-row justify-between">
          <Button
            startIcon={<DeleteIcon />}

            onClick={() => {
              deleteFile();
            }}
            color="secondary"
            variant="contained"
          >
            Delete File
          </Button>
          <Button
            startIcon={<SaveIcon />}
            onClick={() => {
              updateName();
            }}
            color="primary"
            variant="contained"
          >
            Save changes
          </Button>
        </DialogActions>
        <Button onClick={closeDialog}>Close</Button>
      </Dialog>
    </div>
  );
}
