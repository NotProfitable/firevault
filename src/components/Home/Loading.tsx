import { CircularProgress } from '@material-ui/core';
import styles from '../../styles/Home.module.css';

export default function Loading() {
	return (
		<div className={styles.container}>
			<CircularProgress />
		</div>
	);
}
