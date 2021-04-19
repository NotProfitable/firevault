import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Snackbar from '@material-ui/core/Snackbar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress } from '@material-ui/core';
import Alert from '@/components/Alert';
import fire from '../../../../utils/firebase';

type propTypes = {
	open: boolean;
	handleClose: Function;
};

export default function CreateProjectDialog(props: propTypes) {
	const [created, setCreated] = useState(false);
	const [buttonContent, setButtonContent] = useState<any>(`Create`);
	const [name, setName] = useState(``);
	const [description, setDescription] = useState(``);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const router = useRouter();
	const handleDialogClose = () => {
		props.handleClose();
	};
	const handleChange = (event: any) => {
		if (event.target.name === `name`) {
			if (event.target.value.length < 40) {
				setName(event.target.value);
			}
		} else if (event.target.name === `description`) {
			if (event.target.value.length < 100) {
				setDescription(event.target.value);
			}
		}
	};
	const openSnackbar = () => {
		setSnackbarOpen(true);
	};
	const closeSnackbar = (
		event: React.SyntheticEvent | React.MouseEvent,
		reason?: string,
	) => {
		if (reason === `clickaway`) {
			return;
		}
		setSnackbarOpen(false);
	};
	const createProject = () => {
		if (name.length > 0) {
			setCreated(true);
			setButtonContent(<CircularProgress />);
			fire
				.auth()
				.currentUser?.getIdToken(true)
				.then((idToken) => {
					fetch(`/api/createProject/${fire.auth().currentUser?.uid}`, {
						method: `POST`,
						headers: {
							Authorization: idToken,
						},
						body: JSON.stringify({
							projectName: name,
							description,
						}),
					})
						.then((r) => r.json())
						.then((data) => {
							setButtonContent(`Success`);
							router.push(`/${data.id}`);
						});
				})
				.catch((error) => {
					setButtonContent(`An error occured.`);
				});
		} else {
			setSnackbarOpen(true);
		}
	};

	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			open={props.open}
			onClose={handleDialogClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">Create a Project</DialogTitle>
			<DialogContent>
				<DialogContentText>Start a new DataPool project</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					name="name"
					label="Name"
					type="text"
					onChange={handleChange}
					value={name}
					fullWidth
				/>
				<TextField
					margin="dense"
					id="description"
					name="description"
					label="Description"
					type="text"
					onChange={handleChange}
					value={description}
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDialogClose} color="primary">
					Cancel
				</Button>
				<Button onClick={createProject} color="primary" disabled={created}>
					{buttonContent}
				</Button>
			</DialogActions>

			<Snackbar
				anchorOrigin={{
					vertical: `bottom`,
					horizontal: `left`,
				}}
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={closeSnackbar}
			>
				<Alert severity="error">Enter a name to create a project.</Alert>
			</Snackbar>
		</Dialog>
	);
}
