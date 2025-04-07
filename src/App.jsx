import UserForm from "./components/UserForm";
import UserCards from "./components/UserCards";
import { Routes, Route } from "react-router";
import { useState } from "react";

function App() {
	const [users, setUsers] = useState([
		{
			id: 1,
			fname: "Harsh",
			lname: "Singh",
			email: "harsh@gmail.com",
			password: "H@rsh1601",
			gender: "male",
			dob: "16-01-2001",
			phone: "917393917886",
			image: null,
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
			image: null,
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
			image: null,
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
			image: null,
		},
	]);
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
