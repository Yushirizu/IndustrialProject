import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import * as React from "react";

const pages = [
	{ name: "Index", href: "/" },
	{ name: "Live", href: "/live" },
	{ name: "Historic", href: "/historic" },
];

function ResponsiveAppBar() {
	return (
		<AppBar
			position="static"
			sx={{ backgroundColor: "transparent" }}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								key={page.name}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								<Link
									href={page.href}
									sx={{ textDecoration: "none", color: "white" }}
								>
									{page.name}
								</Link>
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default ResponsiveAppBar;
