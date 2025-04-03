import React, { useEffect, useState } from "react";
import {
	Typography,
	Button,
	Grid,
	Container,
	Box,
	Paper,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
} from "@mui/material";
import { useNavigate } from "react-router";
import ImagePreview from "./ImagePreview";
import SearchBar from "./SearchBar";

const UserCards = ({ setId, users }) => {
	const [gender, setGender] = useState("");
	const [query, setQuery] = useState("");
	const navigate = useNavigate();
	const filteredUsers = () => {
		return users.filter((user) => {
			const matchesSearch =
				!query ||
				user.fname.toLowerCase().includes(query.toLowerCase()) ||
				user.email.toLowerCase().includes(query.toLowerCase());

			const matchesGender =
				gender === "" || user.gender.toLowerCase() === gender.toLowerCase();

			return matchesSearch && matchesGender;
		});
	};
	console.log(filteredUsers);

	const handleChange = (event) => {
		setGender(event.target.value);
	};
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
				{users.length > 0 && <SearchBar setQuery={setQuery} />}
				{users.length > 0 && (
					<Box sx={{ minWidth: 120 }}>
						<FormControl sx={{ width: "170px" }}>
							<InputLabel id="demo-simple-select-label">Gender</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={gender}
								label="Gender"
								onChange={handleChange}
							>
								<MenuItem value={""}>All</MenuItem>
								<MenuItem value={"male"}>Male</MenuItem>
								<MenuItem value={"female"}>Female</MenuItem>
								<MenuItem value={"others"}>Others</MenuItem>
							</Select>
						</FormControl>
					</Box>
				)}

				<Grid
					container
					spacing={2}
					sx={{ width: "100%", mt: 2, overflowY: "auto", height: 500 }}
				>
					{filteredUsers().map((user) => (
						<Grid size={{ xs: 12, md: 4 }} key={user.id}>
							<Paper
								elevation={2}
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									padding: 2,
									height: 450,
									border: "1px solid lightgray",
								}}
							>
								<ImagePreview imageFile={user.image} />
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
