import { LinearProgress } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { GHRelease } from '../../utils/types';

export default function Footer(props: { dataUsage?: number }) {
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
    <div className="flex flex-col justify-center items-center text-white">
      {props.dataUsage ? (
        <p>
          Total usage: {Math.round((props.dataUsage / 10 ** 6) * 100) / 100} mb
        </p>
      ) : (
        <></>
      )}
      <p>
        {releaseInfo[0]?.name} - Updated{' '}
        {new Date(releaseInfo[0]?.created_at).toLocaleDateString()}
      </p>
    </div>
  );
  return (
    <footer className="flex flex-col justify-center m-3 relative bottom-0 text-center p-0 m-0 w-full">
      {release}
    </footer>
  );
}
