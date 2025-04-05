import React, { useEffect, useState } from "react";
import {
	Typography,
	Button,
	Grid,
	Container,
	Box,
	Paper,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
} from "@mui/material";
import { useNavigate } from "react-router";
import ImagePreview from "./ImagePreview";
import SearchBar from "./SearchBar";
import DateFilter from "./DateFilter";

const UserCards = ({ setId, users, setUsers }) => {
	const [gender, setGender] = useState("");
	const [query, setQuery] = useState("");
	const [value, setValue] = React.useState([null, null]);
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
	const handleChange = (event) => {
		setGender(event.target.value);
	};
	const handleDelete = (id) => {
		setUsers((filteredUsers) => filteredUsers.filter((user) => user.id !== id));
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
				<DateFilter />
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
									alignItems: "center",
									justifyContent: "space-between",
									padding: 2,
									height: 450,
									border: "1px solid lightgray",
								}}
							>
								<ImagePreview imageFile={user.image} />
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										alignItems: "start",
										width: "100%",
									}}
								>
									<Typography variant="h5" color="initial" sx={{ mt: 1 }}>
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
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										gap: 1,
										width: "100%",
									}}
								>
									<Button
										variant="contained"
										color="primary"
										onClick={() => {
											navigate("/edit");
											setId(user.id);
										}}
										sx={{ width: "50%" }}
									>
										Edit
									</Button>
									<Button
										variant="contained"
										color="secondary"
										onClick={() => {
											navigate("/");
											setId(user.id);
											handleDelete(user.id);
										}}
										sx={{ width: "50%" }}
									>
										Delete
									</Button>
								</Box>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
};

export default UserCards;
