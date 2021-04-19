import { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import fire from '../../../../utils/firebase';
import { projectType } from '../../../../utils/types';
import styles from '../../../styles/Home.module.css';

export default function AllProjects() {
	const [projects, setProjects] = useState([]);
	const [status, setStatus] = useState(<CircularProgress />);

	useEffect(() => {
		fire
			.auth()
			.currentUser?.getIdToken(true)
			.then((idToken) => {
				fetch(`/api/getProjects/${fire.auth().currentUser?.uid}`, {
					headers: {
						Authorization: idToken,
					},
				})
					.then((r) => r.json())
					.then((data) => {
						setProjects(data.projects);
						setStatus(<></>);
					});
			})
			.catch((error) => {
				setStatus(<h1>Error</h1>);
			});
	}, []);

	return (
		<div className={styles.grid}>
			{status}
			{projects.map((item: projectType) => (
				// eslint-disable-next-line no-underscore-dangle
				<a href={`/${item._id}`} className={styles.card}>
					<h3>{item.projectName}</h3>
					<p>{item.description}</p>
				</a>
			))}
		</div>
	);
}
