import React from "react";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostersPage from "./pages/PostersPage";
import LoginPage from "./pages/LoginPage";

function App() {
	const isLoggedIn = false;
	return (
		<div className="App">
			<Router>
				<Navbar isLoggedIn={isLoggedIn} />
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/posters" element={<PostersPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
