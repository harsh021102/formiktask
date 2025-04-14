import UserForm from "./components/UserForm";
import UserCards from "./components/UserCards";
import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import TableView from "./components/TableView";
import defaultImg from "./img/defaultImg.jpg";
import dummyUsers from "./data/Data";
const urlToFile = async (url, filename, mimeType) => {
	const res = await fetch(url);
	const blob = await res.blob();
	return new File([blob], filename, { type: mimeType || blob.type });
};
function App() {
	const [users, setUsers] = useState([]);
	const loadDefault = async () => {
		const file = await urlToFile(defaultImg, "defaultImg.jpg", "image/jpg");
		console.log(file);
		// setPreview(defaultImg);
		setUsers([
			{
				id: 1,
				fname: "Harsh",
				lname: "Singh",
				email: "harsh@gmail.com",
				password: "H@rsh1601",
				gender: "male",
				dob: "16-01-2001",
				phone: "917393917886",
				image: file,
			},
			{
				id: 2,
				fname: "Ahinandan",
				lname: "Singh",
				email: "harsh@gmail.com",
				password: "H@rsh1601",
				gender: "male",
				dob: "16-01-1997",
				phone: "917393917886",
				image: file,
			},
			{
				id: 3,
				fname: "Anushka",
				lname: "Sexena",
				email: "harsh@gmail.com",
				password: "H@rsh1601",
				gender: "female",
				dob: "11-12-2003",
				phone: "917393917886",
				image: file,
			},
			{
				id: 4,
				fname: "AAkanksha",
				lname: "Verma",
				email: "harsh@gmail.com",
				password: "H@rsh1601",
				gender: "female",
				dob: "16-11-2000",
				phone: "917393917886",
				image: file,
			},
			{
				id: 5,
				fname: "Snigdha",
				lname: "Verma",
				email: "snig@gmail.com",
				password: "Snig601",
				gender: "female",
				dob: "17-11-2000",
				phone: "918989812345",
				image: file,
			},
			{
				id: 6,
				fname: "Shivam",
				lname: "Verma",
				email: "shiva@gmail.com",
				password: "sasrsh1601",
				gender: "male",
				dob: "16-11-2005",
				phone: "917393917890",
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
			<Route path="/new" element={<UserForm users={users} />} />
			<Route
				path="/edit"
				element={<UserForm users={users} id={id} setUsers={setUsers} />}
			/>
		</Routes>
	);
}

export default App;
