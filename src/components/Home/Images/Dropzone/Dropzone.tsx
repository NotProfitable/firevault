import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import {
  Button,
  Snackbar,
  TextField,
  LinearProgress,
  CircularProgress,
} from '@material-ui/core';
import Alert from '@/components/Alert';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ErrorIcon from '@material-ui/icons/Error';
import fire from '../../../../../utils/firebase';

const statusName = require(`http-status`);

const getColor = (props: {
  isDragAccept: any;
  isDragReject: any;
  isDragActive: any;
}) => {
  if (props.isDragAccept) {
    return `#00e676`;
  }
  if (props.isDragReject) {
    return `#ff1744`;
  }
  if (props.isDragActive) {
    return `#2196f3`;
  }
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props: {
    isDragAccept: any;
    isDragReject: any;
    isDragActive: any;
  }) => getColor(props)};
  border-style: dashed;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function DropzoneArea(props: { reloadData: Function }) {
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(``);
  const [uploadStatusShown, setUploadStatusShown] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [customName, setCustomName] = useState(``);
  let uploadError = false;
  const [fUSL, setFUSL] = useState(new Array(10));
  const fileUploadStatusList = new Array(10);
  const clearStatuses = () => {
    fileUploadStatusList.map((item, index) => {
      fileUploadStatusList[index] = <></>;
    });
    setFUSL(fileUploadStatusList);
  };
  const onDrop = useCallback((acceptedFiles) => {
    clearStatuses();
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    maxFiles: 10,
  });

  const files = acceptedFiles.map((file, fIndex) => (
    <div
      className={`flex flex-row w-full text-left bg-gray-200 dark:bg-gray-500 justify-between items-center m-1 p-3 ${
        fIndex === 0 ? `rounded-tl-md rounded-tr-md` : ``
      } ${
        fIndex === acceptedFiles.length - 1 ? `rounded-bl-md rounded-br-md` : ``
      }`}
    >
      <li key={file.name}>{file.name}</li>
      {fUSL[fIndex]}
    </div>
  ));
  const openSnackbar = () => {
    setAlertOpen(true);
  };
  const closeSnackbar = () => {
    setAlertOpen(false);
  };
  const openStatusSnackbar = () => {
    setUploadStatusShown(true);
  };
  const closeStatusSnackbar = () => {
    setUploadStatusShown(false);
  };
  const uploadFiles = () => {
    clearStatuses();
    setFUSL(fileUploadStatusList);
    acceptedFiles.map((item, index) => {
      fileUploadStatusList[index] = <CircularProgress size={30} />;
      setFUSL(fileUploadStatusList);
      setLoading(true);
      const formData = new FormData();

      formData.append(`file`, acceptedFiles[index]);
      formData.append(`customName`, acceptedFiles[index].name);
      fire
        .auth()
        .currentUser?.getIdToken(false)
        .then((idToken) => {
          fetch(`${process.env.NEXT_PUBLIC_UPLOAD_BASE}/api/addFile`, {
            method: `POST`,
            headers: {
              Authorization: idToken,
            },
            body: formData,
          })
            .then((res) => {
              if (res.status !== 200) {
                fileUploadStatusList[index] = <ErrorIcon color="secondary" />;
                setFUSL(fileUploadStatusList);

                setLoading(false);
                setUploadStatus(
                  `${res.status} - ${statusName[`${res.status}_NAME`]}`,
                );
                openStatusSnackbar();
                uploadError = true;
              }
              return res.json();
            })
            .then((json) => {
              fileUploadStatusList[index] = <CheckBoxIcon />;
              setFUSL(fileUploadStatusList);

              setLoading(false);
              if (!uploadError) {
                props.reloadData();
              }
            });
        });
    });
  };
  return (
    <div className="container w-72 sm:w-96">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        className="bg-gray-100 border-gray-400 dark:bg-gray-600"
      >
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files (max 10 files)</p>
      </Container>
      <div className="flex flex-row justify-center align-middle p-3">
        {/* <h4>Files</h4> */}
        <ul>{files}</ul>
      </div>

      <div className="flex flex-row justify-center align-middle p-2 m-3">
        <Button onClick={uploadFiles} variant="contained" color="primary">
          Upload
        </Button>
      </div>
      {loading ? <LinearProgress /> : <div className="h-1" />}
      <Snackbar
        anchorOrigin={{
          vertical: `bottom`,
          horizontal: `left`,
        }}
        open={alertOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert severity="warning">Attach a file.</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: `bottom`,
          horizontal: `left`,
        }}
        open={uploadStatusShown}
        autoHideDuration={5000}
        onClose={closeStatusSnackbar}
      >
        <Alert severity="error">{uploadStatus}.</Alert>
      </Snackbar>
    </div>
  );
}

export default DropzoneArea;
