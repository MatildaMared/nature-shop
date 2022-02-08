import React from "react";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostersPage from "./pages/PostersPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer/Footer";

function App() {
	const isLoggedIn = false;
	const isAdmin = false;

	return (
		<Router>
			<Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/posters" element={<PostersPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
