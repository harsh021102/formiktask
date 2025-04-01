import logo from "./logo.svg";
import UserForm from "./components/UserForm";
import UserCards from "./components/UserCards";
import { Routes, Route } from "react-router";

function App() {
	return (
		<Routes>
			<Route path="/" element={<UserCards />} />
			<Route path="/new" element={<UserForm />} />
			<Route path="/edit/:id" element={<UserForm />} />
		</Routes>
	);
}

export default App;
