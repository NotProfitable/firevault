import SignedInAppBar from '@/components/SignedInAppBar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import CreateDatabaseDialog from '@/components/Project/Databases/Creation/CreateDatabaseDialog';
import { projectType, Database } from '../../../utils/types';
import fire from '../../../utils/firebase';
import Button from "@material-ui/core/Button";

export default function ProjectPage() {
	const router = useRouter();
	const { project } = router.query;

	const [projectObj, setProjectObj] = useState<projectType>({
		projectName: ``,
		description: ``,
		timestamp: ``,
		_id: ``,
		databases: [],
	});
	const [status, setStatus] = useState(<CircularProgress />);
	const [dialogOpen, setDialogOpen] = useState(false);

	const openCreateDialog = () => {
		setDialogOpen(true);
	};
	const closeCreateDialog = () => {
		setDialogOpen(false);
	};

	useEffect(() => {
		fire
			.auth()
			.currentUser?.getIdToken(true)
			.then((idToken) => {
				fetch(`/api/getProject/${fire.auth().currentUser?.uid}`, {
					method: `POST`,
					headers: {
						Authorization: idToken,
					},
					body: JSON.stringify({
						id: project,
					}),
				})
					.then((r) => r.json())
					.then((data) => {
						if (!data.projectName) {
							setStatus(<h1>Project does not exist</h1>);
						} else {
							setProjectObj(data);
							setStatus(<></>);
						}
					});
			})
			.catch((error) => {
				setStatus(<h1>An error occurred</h1>);
			});
	}, []);
	return (
		<div>
			<SignedInAppBar />
			<h1>this is a project</h1>
			{status}
			<h3>name: {projectObj.projectName}</h3>
			<h3>description: {projectObj.description}</h3>
			<h3>timestamp: {projectObj.timestamp}</h3>
			<h3>Id: {project}</h3>
			{projectObj.databases.length > 0 ? (
				projectObj.databases.map((item) => (
					<h3>
						{item.name} {item.type} {item.url}
					</h3>
				))
			) : (
				<h3>none</h3>
			)}
			<Button onClick={openCreateDialog}>Add a database</Button>
			<CreateDatabaseDialog open={dialogOpen} handleClose={closeCreateDialog} />
		</div>
	);
}
