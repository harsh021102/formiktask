import { Image } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect } from "react";

const ImagePreview = ({ imageFile }) => {
	const [preview, setPreview] = React.useState(null);
	useEffect(() => {
		// console.log(def);
		if (imageFile) {
			// setFieldValue("image", file); // Store actual file for validation
			const reader = new FileReader();
			reader.onloadend = () => setPreview(reader.result); // Only update preview
			reader.readAsDataURL(imageFile);
		}
	}, [imageFile]);
	return imageFile ? (
		<Box
			component="img"
			src={preview}
			alt="Uploaded"
			sx={{
				width: "150px",
				height: "150px",
				borderRadius: "100%",
				objectFit: "cover", // Ensures the image is cropped nicely
				border: "2px solid #ddd",
				boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
			}}
		/>
	) : (
		<></>
	);
};

export default ImagePreview;
