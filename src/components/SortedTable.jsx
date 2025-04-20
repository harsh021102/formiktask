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
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import ImagePreview from "./ImagePreview";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import PhoneInput from "react-phone-input-2";
const FILE_SIZE = 1024 * 1024 * 5;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const inlineValidationSchema = Yup.object({
	fname: Yup.string().required("Required!"),
	email: Yup.string().email("Invalid email format").required("Required!"),
	// image: Yup.mixed()
	// 	.required("Image is required")
	// 	.test(
	// 		"fileSize",
	// 		"File too large. Please upload image of size less than 5MB",
	// 		(value) => {
	// 			return value && value.size <= FILE_SIZE;
	// 		}
	// 	)
	// 	.test(
	// 		"fileFormat",
	// 		"Unsupported format. Please upload jpeg, jpg or png format",
	// 		(value) => {
	// 			return value && SUPPORTED_FORMATS.includes(value.type);
	// 		}
	// 	),
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
		>
			{/* <Tooltip title="Filter list">
				<IconButton>
					<FilterListIcon />
				</IconButton>
			</Tooltip> */}
		</Toolbar>
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
		gender: "",
		dob: "",
		phone: "",
		image: null,
	});
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

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

	const visibleRows = React.useMemo(
		() =>
			[...users]
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rowsPerPage]
	);
	const onSubmit = (field, value) => {
		setEditFormData((prev) => ({ ...prev, [field]: value }));
	};
	return (
		<Box sx={{ width: "100%", height: "60%" }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
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
								const labelId = `enhanced-table-checkbox-${index}`;
								const isEditing = row.id === editRowId;
								return (
									<TableRow
										hover
										onClick={(event) => handleClick(event, row.id)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.id}
										selected={isItemSelected}
										sx={{ cursor: "pointer" }}
									>
										<TableCell style={{ width: "7%" }}>
											<ImagePreview imageFile={row.image} tableView={true} />
										</TableCell>
										{isEditing ? (
											<Formik
												sx={{ display: "flex" }}
												initialValues={editFormData}
												validationSchema={inlineValidationSchema}
												onSubmit={(values) => {
													const updatedUsers = users.map((user) =>
														user.id === editRowId
															? { ...user, ...values }
															: user
													);
													setUsers(updatedUsers);
													setEditRowId(null);
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
													<>
														<TableCell>
															<TextField
																name="fname"
																label="First Name"
																variant="standard"
																fullWidth
																value={values.fname}
																onChange={handleChange}
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
																onChange={handleChange}
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
																onChange={handleChange}
																error={!!errors.email && touched.email}
																helperText={touched.email && errors.email}
															/>
														</TableCell>
														<TableCell>
															<PhoneInput
																country={"in"}
																enableSearch={true}
																value={values.phone}
																fullWidth
																onBlur={handleBlur}
																variant="standard"
																onChange={(phone) =>
																	setFieldValue("phone", phone)
																}
																inputProps={{
																	id: "phone",
																	name: "phone",
																	autoComplete: "tel",
																}}
																inputStyle={{
																	// width: "100%",
																	height: "56px",
																	borderRadius: "1px",
																	borderColor:
																		touched.phone && errors.phone
																			? "red"
																			: "#ccc",
																}}
															/>
														</TableCell>
														<TableCell>
															<TextField
																fullWidth
																label="Date of Birth"
																type="date"
																variant="standard"
																InputLabelProps={{ shrink: true }}
																required
																error={!!errors.dob && touched.dob}
																helperText={touched.dob && errors.dob}
															/>
														</TableCell>
														{/* Add more fields similarly */}
													</>
												)}
											</Formik>
										) : (
											<>
												<TableCell>{row.fname}</TableCell>
												<TableCell>{row.lname}</TableCell>
												<TableCell align="center">{row.email}</TableCell>
												<TableCell align="center">{row.phone}</TableCell>
												<TableCell align="center">{row.dob}</TableCell>
												<TableCell align="center">{row.gender}</TableCell>
											</>
										)}
										<TableCell
											// style={{ width: "150px", height: "50px" }}
											align="right"
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												gap: 1,
											}}
										>
											{editRowId === row.id ? (
												<>
													<Button
														variant="contained"
														color="success"
														onClick={async () => {
															try {
																await inlineValidationSchema.validate(
																	editFormData,
																	{ abortEarly: false }
																);

																const updatedUsers = users.map((user) =>
																	user.id === editRowId ? editFormData : user
																);
																setUsers(updatedUsers);
																setEditRowId(null);
																setFieldErrors({});
															} catch (err) {
																if (err instanceof Yup.ValidationError) {
																	const errors = {};
																	err.inner.forEach((e) => {
																		errors[e.path] = e.message;
																	});
																	setFieldErrors(errors);
																}
															}
														}}
													>
														Save
													</Button>
													<Button
														variant="contained"
														color="inherit"
														onClick={() => setEditRowId(null)}
														sx={{ width: "48%", height: "70%" }}
													>
														Cancel
													</Button>
												</>
											) : (
												<>
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
															setEditRowId(row.id);
															setEditFormData({ ...row });
														}}
														sx={{ width: "48%", height: "70%" }}
													>
														Edit
													</Button>
												</>
											)}
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
				/>
			</Paper>
		</Box>
	);
}
