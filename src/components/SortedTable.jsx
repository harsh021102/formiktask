import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Button, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import ImagePreview from "./ImagePreview";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import { IconButton, Typography } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Formik } from "formik";
import { useState } from "react";
const FILE_SIZE = 1024 * 1024 * 5;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const inlineValidationSchema = Yup.object({
	fname: Yup.string().required("Required!"),
	email: Yup.string().email("Invalid email format").required("Required!"),
	image: Yup.mixed()
		.required("Image is required")
		.test(
			"fileSize",
			"File too large. Please upload image of size less than 5MB",
			(value) => {
				return value && value.size <= FILE_SIZE;
			}
		)
		.test(
			"fileFormat",
			"Unsupported format. Please upload jpeg, jpg or png format",
			(value) => {
				return value && SUPPORTED_FORMATS.includes(value.type);
			}
		),
	password: Yup.string()
		.matches(
			/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			"Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character"
		)
		.required("Password is required"),
	dob: Yup.date()
		.max(
			new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
			"You must be at least 18 years old"
		)
		.required("Date of Birth is required"),
	gender: Yup.string().required("Gender is required"),
});
function descendingComparator(a, b, orderBy) {
	if (orderBy === "dob") {
		return new Date(b.dob) - new Date(a.dob);
	}
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
	{
		id: "fname",
		numeric: false,
		disablePadding: true,
		label: "First Name",
	},
	{
		id: "lname",
		numeric: false,
		disablePadding: true,
		label: "Last Name",
	},
	{
		id: "email",
		numeric: false,
		disablePadding: true,
		label: "Email",
	},
	{
		id: "phone",
		numeric: true,
		disablePadding: false,
		label: "Mobile number",
	},
	{
		id: "dob",
		numeric: true,
		disablePadding: false,
		label: "Date of birth",
	},
	{
		id: "gender",
		numeric: false,
		disablePadding: true,
		label: "Gender",
	},
];

const CustomTablePaginationActions = ({
	count,
	page,
	rowsPerPage,
	onPageChange,
}) => {
	const totalPages = Math.ceil(count / rowsPerPage);

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5, display: "flex", alignItems: "center" }}>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				<KeyboardArrowLeft />
			</IconButton>

			<Typography variant="body2" sx={{ mx: 1, fontWeight: 500 }}>
				Page {page + 1} of {totalPages}
			</Typography>

			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= totalPages - 1}
				aria-label="next page"
			>
				<KeyboardArrowRight />
			</IconButton>
		</Box>
	);
};
function EnhancedTableHead(props) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead
			sx={{ minWidth: "880px", backgroundColor: "rgba(211, 204, 207, 0.8)" }}
		>
			<TableRow>
				<TableCell align="center">Image</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align="center"
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell align="center">Action</TableCell>
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
	const { numSelected } = props;
	return (
		<Toolbar
			sx={[
				{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
				},
				numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				},
			]}
		></Toolbar>
	);
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default function SortedTable({ setId, users, setUsers, handleDelete }) {
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("fname");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(true);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [editRowId, setEditRowId] = React.useState(null);
	const [editFormData, setEditFormData] = React.useState({});
	const [fieldErrors, setFieldErrors] = React.useState({});
	const [initialValues, setInitialValues] = React.useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
		gender: "Male",
		dob: "",
		phone: "",
		image: null,
	});
	const [editRowIds, setEditRowIds] = useState([]);
	const [editedRowsData, setEditedRowsData] = useState({});

	const navigate = useNavigate();

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = users.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

	const visibleRows = React.useMemo(
		() =>
			[...users]
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, users, page, rowsPerPage]
	);
	const handleBulkSave = () => {
		const updatedUsers = users.map((user) =>
			editRowIds.includes(user.id)
				? { ...user, ...editedRowsData[user.id] }
				: user
		);
		setUsers(updatedUsers);
		setEditRowIds([]);
		setEditedRowsData({});
	};
	const handleBulkEdit = () => {
		const ids = users.map((u) => u.id);
		const data = users.reduce((acc, user) => {
			acc[user.id] = { ...user };
			return acc;
		}, {});
		setEditRowIds(ids);
		setEditedRowsData(data);
	};
	return (
		<Box sx={{ width: "100%", height: "60%" }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				{editRowIds.length > 0 && (
					<Button
						variant="contained"
						color="success"
						onClick={handleBulkSave}
						sx={{ m: 2 }}
					>
						Save All
					</Button>
				)}
				<Button
					variant="outlined"
					color="primary"
					onClick={handleBulkEdit}
					sx={{ m: 2 }}
					disabled={editRowIds.length > 0}
				>
					Bulk Edit
				</Button>
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size={dense ? "small" : "medium"}
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={users.length}
						/>
						<TableBody>
							{visibleRows.map((row, index) => {
								const isItemSelected = selected.includes(row.id);
								const isEditing = editRowIds.includes(row.id);

								return isEditing ? (
									<Formik
										key={`edit-${row.id}`}
										initialValues={row}
										validationSchema={inlineValidationSchema}
										onSubmit={(values) => {
											const updatedUsers = users.map((user) =>
												user.id === row.id ? { ...user, ...values } : user
											);
											setUsers(updatedUsers);

											setEditRowIds((prev) =>
												prev.filter((id) => id !== row.id)
											);
											setEditedRowsData((prev) => {
												const updated = { ...prev };
												delete updated[row.id];
												return updated;
											});
										}}
										enableReinitialize
									>
										{({
											handleSubmit,
											handleChange,
											handleBlur,
											values,
											errors,
											touched,
											setFieldValue,
										}) => (
											<TableRow
												hover
												role="checkbox"
												aria-checked={isItemSelected}
												tabIndex={-1}
												selected={isItemSelected}
											>
												<TableCell
													style={{ width: "7%", position: "relative" }}
												>
													<Box
														position="relative"
														width="50px"
														height="50px"
														sx={{
															borderRadius: "50%",
															overflow: "hidden",
															cursor: "pointer",
															"&:hover .upload-overlay": {
																opacity: 1,
															},
														}}
													>
														{/* Profile Image Preview */}
														{values.image ? (
															<img
																src={
																	typeof values.image === "string"
																		? values.image
																		: URL.createObjectURL(values.image)
																}
																alt="Profile"
																style={{
																	width: "100%",
																	height: "100%",
																	objectFit: "cover",
																}}
															/>
														) : (
															<Box
																width="100%"
																height="100%"
																display="flex"
																alignItems="center"
																justifyContent="center"
																bgcolor="#f0f0f0"
															>
																No Image
															</Box>
														)}

														{/* Hidden Input */}
														<input
															accept="image/*"
															id="file-upload"
															type="file"
															style={{ display: "none" }}
															onChange={(event) => {
																const file = event.currentTarget.files[0];
																if (file) {
																	setFieldValue("image", file);
																}
															}}
														/>
														<label htmlFor="file-upload">
															<Box
																className="upload-overlay"
																position="absolute"
																top={0}
																left={0}
																width="100%"
																height="100%"
																display="flex"
																alignItems="center"
																justifyContent="center"
																sx={{
																	backgroundColor: "rgba(0, 0, 0, 0.5)",
																	color: "#fff",
																	fontSize: "0.7rem",
																	fontWeight: "bold",
																	opacity: 0,
																	transition: "opacity 0.3s ease",
																	cursor: "pointer",
																}}
															>
																Edit
															</Box>
														</label>
													</Box>
												</TableCell>
												{/* <TableCell></TableCell> */}
												<TableCell>
													<TextField
														name="fname"
														label="First Name"
														variant="standard"
														fullWidth
														value={values.fname}
														onChange={(e) => {
															handleChange(e);
															const { name, value } = e.target;
															setEditedRowsData((prev) => ({
																...prev,
																[row.id]: {
																	...prev[row.id],
																	[name]: value,
																},
															}));
														}}
														error={!!errors.fname && touched.fname}
														helperText={touched.fname && errors.fname}
													/>
												</TableCell>
												<TableCell>
													<TextField
														name="lname"
														label="Last Name"
														variant="standard"
														fullWidth
														value={values.lname}
														onChange={(e) => {
															handleChange(e);
															const { name, value } = e.target;
															setEditedRowsData((prev) => ({
																...prev,
																[row.id]: {
																	...prev[row.id],
																	[name]: value,
																},
															}));
														}}
														error={!!errors.lname && touched.lname}
														helperText={touched.lname && errors.lname}
													/>
												</TableCell>
												<TableCell>
													<TextField
														name="email"
														label="Email"
														variant="standard"
														fullWidth
														value={values.email}
														onChange={(e) => {
															handleChange(e);
															const { name, value } = e.target;
															setEditedRowsData((prev) => ({
																...prev,
																[row.id]: {
																	...prev[row.id],
																	[name]: value,
																},
															}));
														}}
														error={!!errors.email && touched.email}
														helperText={touched.email && errors.email}
													/>
												</TableCell>
												<TableCell>
													<PhoneInput
														country={"in"}
														enableSearch
														value={values.phone}
														onBlur={handleBlur}
														onChange={(phone) => setFieldValue("phone", phone)}
														inputProps={{
															id: "phone",
															name: "phone",
															autoComplete: "tel",
														}}
														inputStyle={{
															height: "40px",
															width: "180px",
															borderRadius: "1px",
															borderColor:
																touched.phone && errors.phone ? "red" : "#ccc",
														}}
													/>
												</TableCell>
												<TableCell>
													<TextField
														fullWidth
														label="Date of Birth"
														type="date"
														variant="standard"
														name="dob"
														value={values.dob}
														onChange={handleChange}
														InputLabelProps={{ shrink: true }}
														error={!!errors.dob && touched.dob}
														helperText={touched.dob && errors.dob}
													/>
												</TableCell>
												<TableCell>
													<TextField
														select
														fullWidth
														label="Gender"
														variant="standard"
														name="gender"
														value={values.gender}
														onChange={handleChange}
														error={!!errors.gender && touched.gender}
														helperText={touched.gender && errors.gender}
													>
														<MenuItem value="Male">Male</MenuItem>
														<MenuItem value="Female">Female</MenuItem>
														<MenuItem value="Other">Other</MenuItem>
													</TextField>
												</TableCell>
												<TableCell align="right" sx={{ display: "flex" }}>
													<Button
														variant="contained"
														color="inherit"
														onClick={() => setEditRowId(null)}
														sx={{ width: "48%", height: "70%" }}
													>
														Cancel
													</Button>
													<Button
														variant="contained"
														color="success"
														onClick={handleSubmit}
														sx={{ width: "48%", height: "70%", mr: 1 }}
													>
														Save
													</Button>
												</TableCell>
											</TableRow>
										)}
									</Formik>
								) : (
									<TableRow
										key={row.id}
										hover
										onClick={(event) => handleClick(event, row.id)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										selected={isItemSelected}
										sx={{ cursor: "pointer" }}
									>
										<TableCell style={{ width: "7%" }}>
											<ImagePreview imageFile={row.image} tableView={true} />
										</TableCell>
										<TableCell>{row.fname}</TableCell>
										<TableCell>{row.lname}</TableCell>
										<TableCell align="center">{row.email}</TableCell>
										<TableCell align="center">{row.phone}</TableCell>
										<TableCell align="center">{row.dob}</TableCell>
										<TableCell align="center">{row.gender}</TableCell>
										<TableCell
											align="right"
											sx={{ display: "flex", justifyContent: "center", gap: 1 }}
										>
											<Button
												variant="contained"
												color="secondary"
												onClick={() => {
													navigate("/");
													setId(row.id);
													handleDelete(row.id);
												}}
												sx={{ width: "48%", height: "70%" }}
											>
												Delete
											</Button>
											<Button
												variant="contained"
												color="primary"
												onClick={() => {
													setEditRowIds((prev) => [...prev, row.id]);
													setEditedRowsData((prev) => ({
														...prev,
														[row.id]: { ...row },
													}));
												}}
												sx={{ width: "48%", height: "70%" }}
											>
												Edit
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={users.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					ActionsComponent={CustomTablePaginationActions}
				/>
			</Paper>
		</Box>
	);
}
