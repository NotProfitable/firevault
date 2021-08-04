import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import {
  Button,
  CircularProgress,
  TextField,
  Snackbar,
} from '@material-ui/core';
import Alert from '@/components/Alert';
import fire from '../../../../utils/firebase';

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

function DropzoneArea() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(``);
  const [alertOpen, setAlertOpen] = useState(false);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    maxFiles: 1,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.name}>{file.name}</li>
  ));
  const openSnackbar = () => {
    setAlertOpen(true);
  };
  const closeSnackbar = () => {
    setAlertOpen(false);
  };
  const uploadFiles = () => {
    if (acceptedFiles.length !== 1) {
      openSnackbar();
      return;
    }
    setLoading(true);
    const formData = new FormData();

    formData.append(`file`, acceptedFiles[0]);

    fire
      .auth()
      .currentUser?.getIdToken(false)
      .then((idToken) => {
        fetch(`/api/addFile`, {
          method: `POST`,
          headers: {
            Authorization: idToken,
          },
          body: formData,
        })
          .then((res) => {
            if (res.status !== 200) {
              setStatus(res.statusText);
            }
            return res.json();
          })
          .then((json) => {
            console.log(json);
            setLoading(false);
            window.location.reload();
          });
      });
  };
  return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        className="bg-gray-100 border-gray-400 dark:bg-gray-600"
      >
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </Container>
      <aside className="flex flex-row justify-center align-middle p-3">
        {/* <h4>Files</h4> */}
        <ul>{status === `` ? files : status}</ul>
      </aside>
      <div className="flex flex-row justify-center align-middle p-2">
        {loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={uploadFiles} variant="contained" color="primary">
            Upload
          </Button>
        )}
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: `bottom`,
          horizontal: `left`,
        }}
        open={alertOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert severity="error">Attach a file.</Alert>
      </Snackbar>
    </div>
  );
}

export default DropzoneArea;
