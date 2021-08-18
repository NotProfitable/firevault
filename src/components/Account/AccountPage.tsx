import AccountAppBar from '@/components/Account/AccountAppBar';
import Footer from '@/components/Home/Footer';
import fire from '../../../utils/firebase';
import Settings from '@/components/Account/Settings';

export default function HomePage() {
  const photoURL = fire.auth()?.currentUser?.photoURL;
  const name = fire.auth().currentUser!.displayName;

  return (
    <div className="flex flex-col justify-center text-center items-center">
      <AccountAppBar />
      <div className="flex flex-col justify-center items-center pt-20">
        <main className="flex flex-col justify-center flex-1 items-center p-5 dark:text-blue-50">
          <Settings />
        </main>
        <Footer />
      </div>
    </div>
  );
}
