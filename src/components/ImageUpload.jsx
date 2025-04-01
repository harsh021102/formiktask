import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";

const ImageUpload = () => {
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setImage(file);
			const objectUrl = URL.createObjectURL(file);
			setPreview(objectUrl);
			// window.open(preview, "_blank");
			console.log(preview);
		}
	};

	const handleOpenInNewTab = () => {
		if (preview) {
			window.open(preview, "_blank"); // Open image in new tab
		}
	};

	useEffect(() => {
		return () => {
			if (preview) URL.revokeObjectURL(preview); // Clean up URL when component unmounts
		};
	}, [preview]);

	return (
		<Box display="flex" flexDirection="column" alignItems="center" gap={2}>
			<Typography variant="h6">Upload an Image</Typography>

			<Button variant="contained" component="label">
				Select Image
				<input
					type="file"
					accept="image/*"
					hidden
					onChange={handleImageChange}
				/>
			</Button>

			{preview && (
				<Box mt={2}>
					<Typography variant="subtitle1">Preview:</Typography>
					<img
						src={preview}
						alt="Preview"
						style={{
							width: "150px",
							height: "150px",
							objectFit: "cover",
							borderRadius: "8px",
						}}
					/>
					<Button
						variant="outlined"
						sx={{ marginTop: 1 }}
						onClick={handleOpenInNewTab}
					>
						Open in New Tab
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default ImageUpload;
