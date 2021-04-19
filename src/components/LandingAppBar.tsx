import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import fire from '../../utils/firebase';

export const uiConfig = {
	signInFlow: `popup`,
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebase.auth.TwitterAuthProvider.PROVIDER_ID,
	],
};

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

export default function LandingAppBar() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<AppBar position="fixed">
				<Toolbar
					style={{
						display: `flex`,
						flexDirection: `row`,
						justifyContent: `space-between`,
					}}
				>
					<Typography variant="h6" className={classes.title}>
						DataPool
					</Typography>
					<IconButton href="https://github.com/ashwink0/datapool">
						<GitHubIcon
							style={{
								color: `white`,
							}}
						/>
					</IconButton>
					<Button onClick={handleOpen} color="inherit">
						Login / Sign Up
					</Button>
				</Toolbar>
			</AppBar>
			<Dialog
				fullWidth
				maxWidth="xs"
				aria-labelledby="simple-dialog-title"
				open={open}
				onClose={handleClose}
			>
				<DialogTitle id="simple-dialog-title">Login / Sign Up</DialogTitle>
				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />
			</Dialog>
		</div>
	);
}
