import { useState, useEffect } from 'react';
import fire from '../../../../utils/firebase';

export default function AccountImages() {
  useEffect(() => {
    fire
      .auth()
      .currentUser?.getIdToken(true)
      .then((idToken) => {
        fetch(`/api/uidTest`, {
          method: `GET`,
          headers: {
            Authorization: idToken,
          },
        });
      });
  });

  return <p>account images</p>;
}
