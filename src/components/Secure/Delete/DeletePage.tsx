import DeleteAppBar from '@/components/Secure/Delete/DeleteAppBar';
import Footer from '@/components/Home/Footer';
import fire from '../../../utils/firebase';
import Button from '@material-ui/core/Button';

export default function DeletePage() {
  const deleteAccount = () => {
    fire
      .auth()
      .currentUser?.delete()
      .then((r) => {
        window.location.replace(`/`);
      });
  };
  const goBack = () => {
    window.location.replace(`/account`);
  }
  return (
    <div>
      <DeleteAppBar />
      <div className="flex flex-col justify-center items-center pt-20">
        <main className="flex flex-col justify-center flex-1 items-center p-5 dark:text-blue-50">
          <p className="text-4xl">Delete Account</p>
          <p className="text-xl w-80 text-center m-10">
            This will delete your user account but keep all of your uploaded
            accessible on Firevault.
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
              Delete Account
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
