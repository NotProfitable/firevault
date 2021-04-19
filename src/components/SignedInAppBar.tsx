import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import fire from '../../utils/firebase';

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

export default function SignedInAppBar() {
	const classes = useStyles();
	const photoURL = fire.auth()?.currentUser?.photoURL;
	const name = fire.auth().currentUser!.displayName;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isMenuOpen = Boolean(anchorEl);
	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	const signOut = () => {
		fire.auth().signOut();
	};
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: `top`, horizontal: `right` }}
			keepMounted
			transformOrigin={{ vertical: `top`, horizontal: `right` }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={signOut}>Sign Out</MenuItem>
		</Menu>
	);

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
					<a href="/">
						<Typography variant="h6" className={classes.title}>
							DataPool | Dashboard
						</Typography>
					</a>
					<Avatar
						onClick={handleProfileMenuOpen}
						src={photoURL as string}
					/>
				</Toolbar>
			</AppBar>
			{renderMenu}
		</div>
	);
}
