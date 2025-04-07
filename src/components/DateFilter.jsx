import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";

const DateFilter = ({ dateRange, setDateRange }) => {
	const [startDate, setStartDate] = React.useState(dateRange?.[0] || "");
	const [endDate, setEndDate] = React.useState(dateRange?.[1] || "");
	const [dateError, setDateError] = React.useState("");
	useEffect(() => {
		if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
			setDateError("Start date cannot be after end date.");
		} else {
			setDateError(""); // clear error
		}
	}, [startDate, endDate]);
	// useEffect(() => {
	// 	console.log("DateFiler", dateRange[0], dateRange[1]);
	// }, []);
	useEffect(() => {
		setDateRange([startDate, endDate]);
	}, [startDate, endDate, setDateRange]);
	return (
		<>
			<Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
				<TextField
					fullWidth
					label="Start Date"
					type="date"
					variant="outlined"
					InputLabelProps={{ shrink: true }}
					required
					sx={{ width: "20%" }}
					value={startDate}
					onChange={(e) => {
						setStartDate(e.target.value);
					}}
				/>
				&nbsp;–&nbsp;
				<TextField
					fullWidth
					label="End Date"
					type="date"
					variant="outlined"
					InputLabelProps={{ shrink: true }}
					required
					sx={{ width: "20%" }}
					value={endDate}
					onChange={(e) => {
						setEndDate(e.target.value);
					}}
				/>
			</Box>
			{dateError && (
				<Typography color="error" sx={{ mt: 1 }}>
					{dateError}
				</Typography>
			)}
		</>
	);
};

export default DateFilter;
