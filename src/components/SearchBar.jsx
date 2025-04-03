import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ setQuery }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleChange = (event) => {
		// console.log(event.);

		setSearchTerm(event.target.value);
		setQuery(event.target.value);
	};

	return (
		<TextField
			variant="outlined"
			placeholder="Search..."
			fullWidth
			value={searchTerm}
			onChange={handleChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				),
			}}
			sx={{ mb: 1 }}
		/>
	);
};

export default SearchBar;
