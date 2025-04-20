import UserForm from "./components/UserForm";
import UserCards from "./components/UserCards";
import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import defaultImg from "./img/defaultImg.jpg";

const urlToFile = async (url, filename, mimeType) => {
	const res = await fetch(url);
	const blob = await res.blob();
	return new File([blob], filename, { type: mimeType || blob.type });
};
function App() {
	const [users, setUsers] = useState([]);
	const loadDefault = async () => {
		const file = await urlToFile(defaultImg, "defaultImg.jpg", "image/jpg");
		// console.log(file);
		setUsers([
			{
				id: 1,
				fname: "Harsh",
				lname: "Singh",
				email: "harsh@gmail.com",
				password: "H@rsh1601",
				gender: "Male",
				dob: "2001-01-16",
				phone: "917393917886",
				image: file,
			},
			{
				id: 2,
				fname: "Abinandan",
				lname: "Singh",
				email: "abhi@gmail.com",
				password: "H@rsh1601",
				gender: "Male",
				dob: "2001-09-09",
				phone: "557393917886",
				image: file,
			},
			{
				id: 3,
				fname: "Anushka",
				lname: "Saxena",
				email: "anu@gmail.com",
				password: "H@rsh1601",
				gender: "Female",
				dob: "1995-12-23",
				phone: "217393917886",
				image: file,
			},
			{
				id: 4,
				fname: "Aakanksha",
				lname: "Verma",
				email: "ak@gmail.com",
				password: "H@rsh1601",
				gender: "Female",
				dob: "1997-11-09",
				phone: "917393917886",
				image: file,
			},
			{
				id: 5,
				fname: "Snigdha",
				lname: "Verma",
				email: "snig@gmail.com",
				password: "Snig601",
				gender: "Female",
				dob: "2005-09-20",
				phone: "908989812345",
				image: file,
			},
			{
				id: 6,
				fname: "Shivam",
				lname: "Verma",
				email: "shiva@gmail.com",
				password: "sasrsh1601",
				gender: "Male",
				dob: "2000-08-04",
				phone: "227393917890",
				image: file,
			},
		]);
	};
	useEffect(() => {
		loadDefault();
		// console.log(users);
	}, []);

	const [id, setId] = useState(null);
	return (
		<Routes>
			<Route
				path="/"
				element={<UserCards setId={setId} users={users} setUsers={setUsers} />}
			/>
			<Route
				path="/new"
				element={<UserForm users={users} setUsers={setUsers} />}
			/>
			<Route
				path="/edit"
				element={<UserForm users={users} id={id} setUsers={setUsers} />}
			/>
		</Routes>
	);
}

export default App;
