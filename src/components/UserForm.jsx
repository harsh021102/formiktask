import React, { useState } from "react";
import {
	TextField,
	MenuItem,
	Button,
	Grid,
	Container,
	Typography,
	Box,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import defaultImg from "../img/defaultImg.jpg";
const FILE_SIZE = 1024 * 1024 * 5;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const validationSchema = Yup.object({
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
const urlToFile = async (url, filename, mimeType) => {
	const res = await fetch(url);
	const blob = await res.blob();
	return new File([blob], filename, { type: mimeType || blob.type });
};
const UserForm = ({ users, id, setUsers }) => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [preview, setPreview] = useState(null);

	const [initialValues, setInitialValues] = useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
		gender: "",
		dob: "",
		phone: "",
		image: defaultImg,
	});
	const loadDefault = async () => {
		const file = await urlToFile(defaultImg, "defaultImg.jpg", "image/jpg");
		console.log(file);
		setPreview(defaultImg);
		setInitialValues((prev) => ({
			...prev,
			image: file,
		}));
	};
	useEffect(() => {
		loadDefault();
	}, []);

	useEffect(() => {
		if (id) {
			const userData = users.find((user) => user.id === Number(id));
			if (userData) {
				setInitialValues(userData);
				if (userData.image) {
					const reader = new FileReader();
					reader.onloadend = () => setPreview(reader.result);
					reader.readAsDataURL(userData.image);
				}
			}
		}
	}, [id, users]);

	useEffect(() => {
		console.log("Initial Values: ", initialValues);
	}, [initialValues]);
	const onSubmit = (values) => {
		console.log(id, values);

		if (id) {
			setUsers((users) =>
				users.map((user) => (user.id === id ? { ...user, ...values } : user))
			);
		} else {
			const newUser = { ...values, id: users.length + 1 };
			users.push(newUser);
		}
		navigate("/");
	};
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		console.log(file);

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => setPreview(reader.result);
			reader.readAsDataURL(file);
		}
	};
	return (
		<Container maxWidth="sm">
			<Box display="flex" flexDirection="column" alignItems="center">
				<Typography variant="h4" align="center" gutterBottom>
					Responsive Form
				</Typography>
				<Formik
					initialValues={initialValues}
					enableReinitialize={true}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					<Form style={{ width: "100%" }}>
						<Grid
							container
							spacing={2}
							direction="column"
							alignItems="center"
							style={{
								width: "100%",
							}}
						>
							<Grid item xs={12} style={{ width: "100%" }}>
								{preview && (
									<Box sx={{ display: "flex", justifyContent: "center" }}>
										<Box
											component="img"
											src={preview}
											alt="Uploaded"
											sx={{
												width: "150px",
												height: "150px",
												borderRadius: "100%",
												objectFit: "cover",
												border: "2px solid #ddd",
												boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
											}}
										/>
									</Box>
								)}
								<Field name="image">
									{({ field, form }) => (
										<Box
											display="flex"
											flexDirection="row"
											justifyContent="center"
											gap={2}
										>
											<input
												accept="image/*"
												style={{ display: "none" }}
												id="file-upload"
												type="file"
												onChange={(event) => {
													const file = event.currentTarget.files[0];
													form.setFieldValue("image", file);
													setInitialValues((prev) => ({
														...prev,
														image: file,
													}));
													handleFileChange(event);
												}}
											/>
											<label htmlFor="file-upload">
												<Button
													variant="contained"
													color="primary"
													component="span"
												>
													Edit Profile Image
												</Button>
											</label>
											<Button
												variant="contained"
												color="primary"
												component="span"
												onClick={() => {
													loadDefault();
												}}
											>
												Delete Image
											</Button>
										</Box>
									)}
								</Field>
								<ErrorMessage
									name="image"
									component="div"
									style={{ color: "red" }}
								/>
							</Grid>
							<Grid item xs={12} style={{ width: "100%" }}>
								<Field name="fname">
									{({ field, form }) => (
										<TextField
											{...field}
											fullWidth
											label="First Name"
											name="fname"
											variant="outlined"
											required
											error={form.touched.fname && Boolean(form.errors.fname)}
											helperText={form.touched.fname && form.errors.fname}
										/>
									)}
								</Field>
							</Grid>
							<Grid item xs={12} style={{ width: "100%" }}>
								<Field name="lname">
									{({ field, form }) => (
										<TextField
											{...field}
											fullWidth
											label="Last Name"
											name="lname"
											variant="outlined"
											error={form.touched.lname && Boolean(form.errors.lname)}
											helperText={form.touched.lname && form.errors.lname}
										/>
									)}
								</Field>
							</Grid>
							<Grid item xs={12} style={{ width: "100%" }}>
								<Field name="email">
									{({ field, form }) => (
										<TextField
											{...field}
											fullWidth
											label="Email"
											type="email"
											variant="outlined"
											required
											error={form.touched.email && Boolean(form.errors.email)}
											helperText={form.touched.email && form.errors.email}
										/>
									)}
								</Field>
							</Grid>
							<Grid item xs={12} style={{ width: "100%" }}>
								<Field name="dob">
									{({ field, form }) => (
										<TextField
											{...field}
											fullWidth
											label="Date of Birth"
											type="date"
											variant="outlined"
											InputLabelProps={{ shrink: true }}
											required
											error={form.touched.dob && Boolean(form.errors.dob)}
											helperText={form.touched.dob && form.errors.dob}
										/>
									)}
								</Field>
							</Grid>
							<Grid item xs={12} style={{ width: "100%" }}>
								<Field name="phone">
									{({ field, form }) => (
										<PhoneInput
											country={"in"}
											enableSearch={true}
											value={field.value}
											onBlur={field.onBlur}
											onChange={(phone) => form.setFieldValue("phone", phone)}
											inputProps={{
												id: "phone",
												name: "phone",
												autoComplete: "tel",
											}}
											inputStyle={{
												width: "100%",
												height: "56px",
												borderRadius: "5px",
												borderColor:
													form.touched.phone && form.errors.phone
														? "red"
														: "#ccc",
											}}
										/>
									)}
								</Field>
							</Grid>
							<Grid item xs={12} style={{ width: "100%" }}>
								<Field name="gender">
									{({ field, form }) => {
										return (
											<TextField
												{...field}
												select
												fullWidth
												label="Gender"
												variant="outlined"
												required
												error={
													form.touched.gender && Boolean(form.errors.gender)
												}
												helperText={form.touched.gender && form.errors.gender}
											>
												<MenuItem value="male">Male</MenuItem>
												<MenuItem value="female">Female</MenuItem>
												<MenuItem value="other">Other</MenuItem>
											</TextField>
										);
									}}
								</Field>
							</Grid>
							<Field name="password">
								{({ field, form }) => (
									<TextField
										{...field}
										fullWidth
										label="Password"
										type={showPassword ? "text" : "password"}
										variant="outlined"
										required
										error={
											form.touched.password && Boolean(form.errors.password)
										}
										helperText={form.touched.password && form.errors.password}
										slotProps={{
											input: {
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															onClick={togglePasswordVisibility}
															edge="end"
														>
															{showPassword ? (
																<VisibilityOff />
															) : (
																<Visibility />
															)}
														</IconButton>
													</InputAdornment>
												),
											},
										}}
									/>
								)}
							</Field>
							<Grid item xs={12} style={{ width: "100%" }}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									fullWidth
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</Form>
				</Formik>
			</Box>
		</Container>
	);
};

export default UserForm;
