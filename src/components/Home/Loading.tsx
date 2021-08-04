import { LinearProgress } from '@material-ui/core';

export default function Loading() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center align-middle">
      <img
        className="object-contain h-28 w-full md:rounded-none rounded-full mx-auto"
        alt="Logo"
        src="/firevault.png"
      />
      <div className="flex flex-row justify-center m-3">
        <LinearProgress className="w-64" />
      </div>
    </div>
  );
}
