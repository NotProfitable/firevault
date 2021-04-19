import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import AllProjects from '@/components/Home/Projects/allProjects';
import fire from '../../../utils/firebase';
import styles from '../../styles/Home.module.css';
import CreateProjectDialog from './Projects/createProjectDialog';
import SignedInAppBar from '@/components/SignedInAppBar';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function HomePage() {
	const classes = useStyles();
	const photoURL = fire.auth()?.currentUser?.photoURL;
	const name = fire.auth().currentUser!.displayName;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isMenuOpen = Boolean(anchorEl);
	const [dialogOpen, setDialogOpen] = useState(false);

	const openCreateDialog = () => {
		setDialogOpen(true);
	};
	const closeCreateDialog = () => {
		setDialogOpen(false);
	};

	return (
		<div>
			<SignedInAppBar />
			<div className={styles.container}>
				<main className={styles.main}>
					<p>Welcome {name}. You are now signed-in!</p>
					<button
						type="button"
						onClick={openCreateDialog}
						className={styles.card}
						style={{
							backgroundColor: `white`,
						}}
					>
						<h3>Create Project +</h3>
					</button>
					<AllProjects />
					<CreateProjectDialog
						open={dialogOpen}
						handleClose={closeCreateDialog}
					/>
				</main>
			</div>
		</div>
	);
}
