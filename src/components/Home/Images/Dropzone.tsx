import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { Button, CircularProgress } from '@material-ui/core';
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
  const uploadFiles = () => {
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
          .then((res) => res.json())
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
        <ul>{files}</ul>
      </aside>
      <div className="flex flex-row justify-center align-middle p-3">
        {loading ? (
          <CircularProgress />
        ) : (
          <Button onClick={uploadFiles} variant="contained" color="primary">
            Upload
          </Button>
        )}
      </div>
    </div>
  );
}
export default DropzoneArea;
