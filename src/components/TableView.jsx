import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button, TableHead } from "@mui/material";
import { useNavigate } from "react-router";
import ImagePreview from "./ImagePreview";

function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}

TablePaginationActions.propTypes = {
	users: PropTypes.array.isRequired,
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

function createData(fname, lname, email, phone, dob, gender) {
	return { fname, lname, email, phone, dob, gender };
}

export default function TableView({ setId, users, setUsers, handleDelete }) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const navigate = useNavigate();

	// Avoid a layout jump when reaching the last page with empty users.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
	React.useEffect(() => console.log(users), [users]);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
				<TableBody>
					{(rowsPerPage > 0
						? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: users
					).map((row) => (
						<TableRow key={row.ID} sx={{ height: "50px" }}>
							<TableCell style={{ width: "7%" }}>
								<ImagePreview imageFile={row.image} tableView={true} />
							</TableCell>
							<TableCell style={{ width: "180px" }}>
								{row.fname + " " + row.lname}
							</TableCell>
							<TableCell style={{ width: "180px" }} align="right">
								{row.email}
							</TableCell>
							<TableCell style={{ width: "180px" }} align="right">
								{row.phone}
							</TableCell>
							<TableCell
								sx={{
									minWidth: "80px",
								}}
								align="right"
							>
								{row.dob}
							</TableCell>
							<TableCell style={{ width: "180px" }} align="right">
								{row.gender}
							</TableCell>
							<TableCell
								style={{ width: "150px", height: "50px" }}
								align="right"
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
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
										navigate("/edit");
										setId(row.id);
									}}
									sx={{ width: "48%", height: "70%" }}
								>
									Edit
								</Button>
							</TableCell>
						</TableRow>
					))}
					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
							colSpan={7}
							count={users.length}
							rowsPerPage={rowsPerPage}
							page={page}
							slotProps={{
								select: {
									inputProps: {
										"aria-label": "users per page",
									},
									native: true,
								},
							}}
							sx={{ width: "500px" }}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}
