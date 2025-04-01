import UserForm from "./components/UserForm";
import UserCards from "./components/UserCards";
import { Routes, Route } from "react-router";
import { useState } from "react";

function App() {
	const [users, setUsers] = useState([]);
	const [id, setId] = useState(null);
	return (
		<Routes>
<<<<<<< HEAD
			<Route path="/" element={<UserCards setId={setId} users={users} />} />
			<Route path="/new" element={<UserForm users={users} id={null} />} />
			<Route path="/edit" element={<UserForm users={users} id={id} />} />
			{/* <UserForm /> */}
=======
			<Route path="/" element={<UserCards />} />
			<Route path="/new" element={<UserForm />} />
			<Route path="/edit/:id" element={<UserForm />} />
>>>>>>> e0c3a95ccd1cf79c57bce3f9d3cabd893709f8e6
		</Routes>
	);
}

export default App;
