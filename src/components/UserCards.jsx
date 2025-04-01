import React from "react";
import { Typography, Button, Grid, Container, Box, Paper } from "@mui/material";
// import users from "../data/userdata";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";

const UserCards = ({ setId, users }) => {
	// const [users, setUsers] = useState([]);
	// useEffect(() => {
	// 	const userData = JSON.parse(localStorage.getItem("formData")) || [];
	// 	setUsers(userData);
	// 	// console.log(users);
	// }, []);
	const navigate = useNavigate();
	return (
		<Container>
			<Box
				sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
			>
				<Typography variant="h4">All users</Typography>
			</Box>
			<Box>
				<Box sx={{ display: "flex", bgcolor: "lightgray", p: 2 }}>
					<Typography variant="h5">Cards</Typography>
					<Button
						variant="contained"
						color="primary"
						sx={{ ml: 2 }}
						onClick={() => navigate("/new")}
					>
						+ Add User
					</Button>
				</Box>
				<Grid
					container
					spacing={2}
					sx={{ width: "100%", mt: 2, overflowY: "auto" }}
				>
					{users.map((user) => (
						<Grid size={{ xs: 12, md: 4 }} key={user.id}>
							<Paper
								elevation={2}
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									padding: 2,
									height: 250,
								}}
							>
								<Box>
									<Typography variant="h4" color="initial" sx={{ mt: 1 }}>
										Name: {user.fname} {user.lname}
									</Typography>
									<Typography
										variant="subtitle1"
										color="initial"
										sx={{ mt: 1 }}
									>
										Email: {user.email}
									</Typography>
									<Typography
										variant="subtitle1"
										color="initial"
										sx={{ mt: 1 }}
									>
										Phone: {user.phone}
									</Typography>
									<Typography
										variant="subtitle1"
										color="initial"
										sx={{ mt: 1 }}
									>
										Date of birth: {user.dob}
									</Typography>
									<Typography
										variant="subtitle1"
										color="initial"
										sx={{ mt: 1 }}
									>
										Gender: {user.gender}
									</Typography>
								</Box>
								<Button
									variant="contained"
									color="primary"
									onClick={() => {
										navigate("/edit");
										setId(user.id);
									}}
									sx={{ mt: 2 }}
								>
									Edit
								</Button>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
};

export default UserCards;
