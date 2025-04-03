import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const ImageUpload = ({ field, form }) => {
	const [preview, setPreview] = useState(field.value || null);
	const MAX_SIZE = 2 * 1024 * 1024; // 2MB

	const handleFileChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			if (!file.type.startsWith("image/")) {
				form.setFieldError(field.name, "Only image files are allowed!");
				return;
			}

			if (file.size > MAX_SIZE) {
				form.setFieldError(field.name, "File size must be less than 2MB!");
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
				form.setFieldValue(field.name, reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Box display="flex" flexDirection="column" alignItems="center" gap={1}>
			{/* Image Preview */}
			{preview && (
				<Box
					component="img"
					src={preview}
					alt="Profile Preview"
					sx={{
						width: 100,
						height: 100,
						borderRadius: "50%",
						objectFit: "cover",
						border: "2px solid gray",
					}}
				/>
			)}

			{/* Upload Button (Ensuring input is correctly placed) */}
			<Button variant="contained" component="label">
				Upload Profile Picture
				<input
					type="file"
					hidden
					accept="image/*"
					onChange={handleFileChange}
				/>
			</Button>

			{/* Display Errors */}
			{form.errors[field.name] && (
				<Typography color="error">{form.errors[field.name]}</Typography>
			)}
		</Box>
	);
};

export default ImageUpload;
