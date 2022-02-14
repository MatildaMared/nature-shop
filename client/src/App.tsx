import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostersPage from "./pages/PostersPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SinglePosterPage from "./pages/SinglePosterPage";
import Footer from "./components/Footer/Footer";
import { Poster } from "./models/Poster";
import { getAllPosters } from "./services/postersService";
import { getUser } from "./services/userService";
import { getToken, getCart } from "./services/localStorageService";
import AddPosterPage from "./pages/AddPosterPage";
import EditPosterPage from "./pages/EditPosterPage";
import CartPage from "./pages/CartPage";

function App() {
	const [context, updateContext] = useContext(UserContext);
	const [posters, setPosters] = useState<Poster[] | null>(null);
	const token = getToken();
	const { isLoggedIn, isAdmin, isLoading } = context;

	const initializeData = async () => {
		updateContext({ isLoading: true });

		console.log("Fetching posters...");
		const postersResponse = await getAllPosters();
		console.log(postersResponse);
		setPosters(postersResponse.products);

		if (!isLoggedIn) {
			if (token) {
				const userResponse = await getUser(token);
				if (userResponse.success === true) {
					updateContext({
						user: userResponse.user,
						isLoggedIn: true,
						isAdmin: userResponse.user.role === "admin",
					});
				}
			}
		}

		const cart = getCart();
		if (cart) {
			updateContext({ cart });
		}

		updateContext({ isLoading: false });
	};

	useEffect(() => {
		initializeData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			{!isLoading && (
				<Navbar
					isLoggedIn={isLoggedIn}
					isAdmin={isAdmin}
					updateContext={updateContext}
					cart={context.cart}
				/>
			)}
			<Header />
			<Routes>
				<Route path="/" element={<PostersPage posters={posters} />} />
				<Route path="/posters" element={<PostersPage posters={posters} />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route
					path="/posters/:id"
					element={<SinglePosterPage setPosters={setPosters} />}
				/>
				<Route
					path="/posters/:id/edit"
					element={<EditPosterPage isAdmin={isAdmin} setPosters={setPosters} />}
				/>
				<Route
					path="/add"
					element={<AddPosterPage isAdmin={isAdmin} setPosters={setPosters} />}
				/>
				<Route path="/cart" element={<CartPage />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
