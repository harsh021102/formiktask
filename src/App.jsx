import UserForm from "./components/UserForm";
import UserCards from "./components/UserCards";
import { Routes, Route } from "react-router";
import { useState } from "react";

function App() {
	const [users, setUsers] = useState([
		// {
		// 	fname: "Anushka",
		// 	lname: "Saxena",
		// 	email: "anu@gmail.com",
		// 	password: "H@tsdy161",
		// 	gender: "female",
		// 	dob: "01-02-2001",
		// 	phone: "918493343433",
		// 	image: null,
		// },
		// {
		// 	fname: "Harsh",
		// 	lname: "Singh",
		// 	email: "anu@gmail.com",
		// 	password: "H@tsdy161",
		// 	gender: "male",
		// 	dob: "01-02-2001",
		// 	phone: "918493343433",
		// 	image: null,
		// },
		// {
		// 	fname: "Akansha",
		// 	lname: "Sharma",
		// 	email: "ak@gmail.com",
		// 	password: "H@tsdy161",
		// 	gender: "female",
		// 	dob: "01-02-2001",
		// 	phone: "918493343433",
		// 	image: null,
		// },
	]);
	const [id, setId] = useState(null);
	return (
		<Routes>
			<Route path="/" element={<UserCards setId={setId} users={users} />} />
			<Route path="/new" element={<UserForm users={users} />} />
			<Route
				path="/edit"
				element={<UserForm users={users} id={id} setUsers={setUsers} />}
			/>
		</Routes>
	);
}

export default App;
