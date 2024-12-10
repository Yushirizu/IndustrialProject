import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import * as React from "react";
import { signOut, useSession, signIn } from "next-auth/react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";

const pages = [
	{ name: "Index", href: "/" },
	{ name: "Live", href: "/live" },
	{ name: "Historic", href: "/historic" },
	{ name: "Charts", href: "/charts" },
];

function ResponsiveAppBar() {
	const { data: session } = useSession();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="static" sx={{ backgroundColor: "transparent" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								key={page.name}
								sx={{ my: 2, color: "white", display: "block" }}>
								<Link
									href={page.href}
									sx={{ textDecoration: "none", color: "white" }}>
									{page.name}
								</Link>
							</Button>
						))}
					</Box>
					{
						<div>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit">
								{session?.user.image ? (
									<Avatar
										alt={session.user.name || ""}
										src={session.user.image || ""}
									/>
								) : (
									<Avatar>{session?.user.name?.charAt(0)}</Avatar>
								)}
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}>
								{session?.user.isAdmin ? (
									<MenuItem onClick={handleClose}>Admin page</MenuItem>
								) : null}
								{session ? (
									<MenuItem onClick={() => signOut()}>LOGOUT</MenuItem>
								) : (
									<MenuItem onClick={() => signIn()}>LOGIN</MenuItem>
								)}
							</Menu>
						</div>
					}
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default ResponsiveAppBar;
