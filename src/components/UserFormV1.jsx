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
import * as Yup from "yup";
import { Field, Formik, Form } from "formik";
import { IconButton, InputAdornment } from "@mui/material";
import { Today, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
const validationSchema = Yup.object({
	fname: Yup.string().required("Required!"),
	email: Yup.string().email("Invalid email format").required("Required!"),
	phone: Yup.string()
		.matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
		.required("Phone number is required"),

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
const UserFormV1 = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [initialValues, setInitialValues] = useState({
		//id: "",
		fname: "",
		lname: "",
		email: "",
		password: "",
		gender: "",
		dob: "",
		phone: "",
	});

	useEffect(() => {
		if (id) {
			const savedData = JSON.parse(localStorage.getItem("formData")) || [];
			const userData = savedData.find((user) => user.id === Number(id));
			if (userData) {
				setInitialValues(userData);
			}
		}
	}, [id]);

	const onSubmit = (values) => {
		const savedData = JSON.parse(localStorage.getItem("formData")) || [];

		if (id) {
			// Updating existing user
			const updatedData = savedData.map((user) =>
				user.id === Number(id) ? { ...user, ...values } : user
			);
			localStorage.setItem("formData", JSON.stringify(updatedData));
		} else {
			// Adding a new user
			console.log(Date.now());

			const newEntry = id ? { ...values } : { id: Date.now(), ...values }; // ✅ Ensure `id` is set for new entries
			savedData.push(newEntry); // Push new entry to localStorage
			localStorage.setItem("formData", JSON.stringify(savedData));
		}
		navigate("/");
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
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
							style={{ width: "100%" }}
						>
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
									{({ field, form }) => {
										// console.log(form.errors.phone);
										// console.log("Touched: ", form.touched.phone);

										return (
											<TextField
												{...field}
												fullWidth
												label="Phone Number"
												type="tel"
												variant="outlined"
												required
												error={form.touched.phone && Boolean(form.errors.phone)}
												helperText={form.touched.phone && form.errors.phone}
											/>
										);
									}}
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

export default UserFormV1;
