import { LinearProgress } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { GHRelease } from '../../../utils/types';

export default function Footer() {
  const [releaseInfo, setReleaseInfo] = useState<Array<GHRelease>>([]);

  const [loading, setLoading] = useState(true);
  let mounted = false;

  const load = () => {
    fetch(`https://api.github.com/repos/ashwink0/firevault/releases`, {
      method: `GET`,
    })
      .then((res) => res.json())
      .then((json) => {
        setReleaseInfo(json);
        if (!mounted) {
          setLoading(false);
        }
        mounted = true;
      });
  };
  useEffect(() => {
    if (!mounted) {
      load();
    }
  }, []);
  const release = (
    <div className="flex flex-row justify-center items-center p-0 m-0">
      <p className="text-white p-0 m-0"> {releaseInfo[0]?.name} - Updated {new Date(`2021-08-09T00:35:36Z`).toLocaleDateString()}</p>
    </div>
  );
  return (
    <footer className="flex flex-row justify-center m-3 bottom-0 text-center p-0 m-0 w-64">
      {release}
    </footer>
  );
}
