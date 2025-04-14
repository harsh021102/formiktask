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
import View from "../img/View.svg";
import { Image } from "@mui/icons-material";
import TableView from "./TableView";

const UserCards = ({ setId, users, setUsers }) => {
	const [gender, setGender] = useState("");
	const [query, setQuery] = useState("");
	const [dateRange, setDateRange] = useState([null, null]);
	const [showTable, setShowTable] = useState(true);
	const navigate = useNavigate();
	const parseDateString = (dobStr) => {
		if (!dobStr) return null;

		// Example for DD-MM-YYYY format
		const [day, month, year] = dobStr.split("-");
		if (!day || !month || !year) return null;

		return new Date(`${year}-${month}-${day}`);
	};
	const filteredUsers = () => {
		const [startDate, endDate] = dateRange || [];

		return users.filter((user) => {
			const dob = parseDateString(user.dob);

			if (!dob || isNaN(dob)) {
				console.warn("Invalid DOB:", user.dob);
				return false;
			}

			const start = startDate ? new Date(startDate) : null;
			const end = endDate ? new Date(endDate) : null;

			const matchesDOB = (!start || dob >= start) && (!end || dob <= end);

			const matchesSearch =
				!query ||
				user.fname.toLowerCase().includes(query.toLowerCase()) ||
				user.email.toLowerCase().includes(query.toLowerCase());

			const matchesGender =
				!gender || user.gender.toLowerCase() === gender.toLowerCase();
			if (start && end && new Date(start) > new Date(end)) {
				return matchesSearch && matchesGender;
			}
			return matchesSearch && matchesGender && matchesDOB;
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
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mt: 2,
					}}
				>
					<DateFilter setDateRange={setDateRange} />
					<Button
						sx={{ width: "40px", height: "100%" }}
						onClick={() => {
							setShowTable((prev) => !prev);
						}}
					>
						<Box
							component="img"
							src={View}
							alt="Uploaded"
							cursor="pointer"
							sx={{
								width: "50%",
								height: "50%",
								objectFit: "cover",
								border: "2px solid #ddd",
								boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
								pointer: "cursor",
							}}
						/>
					</Button>
				</Box>
				<Grid
					container
					spacing={2}
					sx={{ width: "100%", mt: 2, overflowY: "auto", height: 500 }}
				>
					{showTable ? (
						filteredUsers().map((user) => (
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
									<Box
										sx={{
											// backgroundColor: "red",
											width: "50%",
											height: "150px",
										}}
									>
										<ImagePreview imageFile={user.image} tableView={false} />
									</Box>

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
						))
					) : (
						<TableView
							setId={setId}
							users={filteredUsers()} // Pass filtered users
							setUsers={setUsers}
							handleDelete={handleDelete}
						/>
					)}
				</Grid>
			</Box>
		</Container>
	);
};

export default UserCards;
