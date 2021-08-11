import { CircularProgress, IconButton, Snackbar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import Alert from '@/components/Alert';
import OptionDialog from './OptionDialog';
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

  return (
    <figure className="w-72 md:w-96 md:flex transition duration-300 ease-in-out bg-gray-200 dark:bg-gray-600 rounded-md md:hover:shadow-xl m-4">
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
          <IconButton
            onClick={deleteFile}
            color="secondary"
            aria-label="upload picture"
            component="span"
          >
            <DeleteIcon />
          </IconButton>
          <OptionDialog
            index={props.index}
            reloadData={props.reloadData}
            deleteDataElement={props.deleteDataElement}
            file={props.file}
          />
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
    </figure>
  );
}
