import DeleteAndClearAppBar from '@/components/Secure/DeleteAndClear/DeleteAndClearAppBar';
import Footer from '@/components/Home/Footer';
import Button from '@material-ui/core/Button';
import React from 'react';
import fire from '../../../../utils/firebase';

export default function DeleteAndClearPage() {
  const deleteAccount = () => {
    fire
      .auth()
      .currentUser?.getIdToken(false)
      .then((idToken) => {
        fetch(`${process.env.NEXT_PUBLIC_UPLOAD_BASE}/api/clearData`, {
          method: `POST`,
          headers: {
            Authorization: idToken,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            fire
              .auth()
              .currentUser?.delete()
              .then((r) => {
                window.location.replace(`/`);
              });
          });
      });
  };
  const goBack = () => {
    window.location.replace(`/account`);
  };
  return (
    <div>
      <DeleteAndClearAppBar />
      <div className="flex flex-col justify-center items-center pt-20">
        <main className="flex flex-col justify-center flex-1 items-center p-5 dark:text-blue-50">
          <p className="text-4xl">Delete Account Clear Data</p>
          <p className="text-xl w-80 text-center m-10">
            This will clear all of your files on Firevault and delete your user
            account. This action cannot be undone.
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
              Delete Account and Clear Files
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
