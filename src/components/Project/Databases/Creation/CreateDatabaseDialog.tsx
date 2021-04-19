import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Snackbar from '@material-ui/core/Snackbar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress } from '@material-ui/core';
import Alert from '@/components/Alert';
import fire from '../../../../../utils/firebase';

type propTypes = {
	open: boolean;
	handleClose: Function;
};

export default function CreateDatabaseDialog(props: propTypes) {
	const [created, setCreated] = useState(false);
	const [buttonContent, setButtonContent] = useState<any>(`Create`);
	const [name, setName] = useState(``);
	const [description, setDescription] = useState(``);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
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
	function getSteps() {
		return [`Select database type`, `Enter database Information`];
	}

	function getStepContent(step: number) {
		switch (step) {
			case 0:
				return `Select database type`;
			case 1:
				return `Enter database Information`;
			default:
				return ``;
		}
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			open={props.open}
			onClose={handleDialogClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">Create a Database</DialogTitle>
			<DialogContent>
				<DialogContentText>Add a database to your project</DialogContentText>
				<Stepper activeStep={activeStep}>
					{getSteps().map((label: any) => {
						const stepProps: { completed?: boolean } = {};
						const labelProps: { optional?: React.ReactNode } = {};
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				<Button disabled={activeStep === 0} onClick={handleBack}>
					Back
				</Button>
				<Button onClick={handleNext}>Inc</Button>
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
