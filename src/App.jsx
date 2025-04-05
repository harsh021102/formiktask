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
			gender: "",
			dob: "",
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
