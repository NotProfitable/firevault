import ClearAppBar from '@/components/Secure/Clear/ClearAppBar';
import Footer from '@/components/Home/Footer';
import fire from '../../../utils/firebase';
import Button from '@material-ui/core/Button';
import ErrorIcon from "@material-ui/icons/Error";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import React from "react";

export default function ClearPage() {
  const deleteAccount = () => {
    fire
      .auth()
      .currentUser?.getIdToken(false)
      .then((idToken) => {
        fetch(`/api/clearData`, {
          method: `POST`,
          headers: {
            Authorization: idToken,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            window.location.replace(`/`);
          });
      });
  };
  const goBack = () => {
    window.location.replace(`/account`);
  }
  return (
    <div>
      <ClearAppBar />
      <div className="flex flex-col justify-center items-center pt-20">
        <main className="flex flex-col justify-center flex-1 items-center p-5 dark:text-blue-50">
          <p className="text-4xl">Clear Data</p>
          <p className="text-xl w-80 text-center m-10">
            This will clear all of your existing files on Firevault. This action
            cannot be undone.
          </p>
          <div className="w-80 flex flex-row justify-center items-center">
            <Button
              autoFocus
              onClick={goBack}
              variant="contained"
              color="primary"
            >
              No
            </Button>
            <Button onClick={deleteAccount} className="m-3" variant="contained">
              Clear Data
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
