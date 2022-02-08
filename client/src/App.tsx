import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostersPage from "./pages/PostersPage";
import LoginPage from "./pages/LoginPage";
import SinglePosterPage from "./pages/SinglePosterPage";
import Footer from "./components/Footer/Footer";
import { Poster } from "./models/Poster";

function App() {
	const [posters, setPosters] = useState<Poster[] | null>(null);

	const fetchData = async () => {
		const response = await fetch("/api/products");
		const data = await response.json();
		setPosters(data.products);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const isLoggedIn = false;
	const isAdmin = false;

	return (
		<Router>
			<Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/posters" element={<PostersPage posters={posters} />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/posters/:id" element={<SinglePosterPage />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
